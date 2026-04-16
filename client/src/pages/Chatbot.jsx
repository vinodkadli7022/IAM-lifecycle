import { useState, useContext, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bot, User, Send, CheckCircle } from 'lucide-react';

const Chatbot = () => {
    const [searchParams] = useSearchParams();
    const flow = searchParams.get('flow'); // 'joiner', 'mover', 'leaver'
    const navigate = useNavigate();
    const { api } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [roles, setRoles] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        // Initial data fetch
        const fetchData = async () => {
            try {
                const [rolesRes, empRes] = await Promise.all([
                    api.get('/roles'),
                    api.get('/employees')
                ]);
                setRoles(rolesRes.data);
                setEmployees(empRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();

        // Initial greeting
        const greet = () => {
            let text = '';
            if (flow === 'joiner') text = "Welcome to the Joiner Workflow. Let's onboard a new employee. Please provide the new employee's full name.";
            else if (flow === 'mover') text = "Welcome to the Mover Workflow. Which employee is changing roles? Please provide their full name.";
            else if (flow === 'leaver') text = "Welcome to the Leaver Workflow. Which employee is leaving the organization? Please provide their full name.";
            else text = "How can I help you today?";

            setMessages([{ sender: 'bot', text }]);
        };
        greet();
    }, [flow, api]);

    const addMessage = (sender, text) => {
        setMessages(prev => [...prev, { sender, text }]);
    };

    const handleSend = async () => {
        if (!inputVal.trim()) return;
        const userInput = inputVal.trim();
        addMessage('user', userInput);
        setInputVal('');

        // Finite-state machine
        if (flow === 'joiner') {
            if (step === 0) {
                if (userInput.trim().length < 2 || !/^[A-Za-z\s\-\']+$/.test(userInput)) {
                    addMessage('bot', `Please provide a valid full name containing only letters.`);
                    return;
                }
                setFormData({ ...formData, employeeName: userInput });
                setStep(1);
                addMessage('bot', `Great! What department will ${userInput} be joining? (e.g., Engineering, HR, Sales, Marketing, Finance)`);
            } else if (step === 1) {
                const validDepts = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'Legal', 'IT'];
                const matchedDept = validDepts.find(d => d.toLowerCase() === userInput.toLowerCase());
                
                if (!matchedDept) {
                    addMessage('bot', `I don't recognize the department "${userInput}". Please type one of the following exactly: ${validDepts.join(', ')}`);
                    return;
                }

                // Filter roles based on department to keep the UI clean
                let deptRoles = roles;
                const deptKeywords = {
                    'Engineering': ['developer', 'engineer', 'backend', 'frontend', 'qa'],
                    'HR': ['hr', 'manager', 'human', 'recruiter'],
                    'IT': ['admin', 'security', 'it', 'support', 'administrator'],
                    'Sales': ['sales', 'representative', 'account'],
                    'Finance': ['finance', 'accountant', 'analyst']
                };

                const keywords = deptKeywords[matchedDept];
                if (keywords) {
                    deptRoles = roles.filter(r => {
                        const name = r.roleName.toLowerCase();
                        // Also always include generic 'Employee' roles
                        return keywords.some(k => name.includes(k)) || name.includes('employee');
                    });
                }
                
                if (deptRoles.length === 0) deptRoles = roles; // Fallback

                setFormData({ ...formData, department: matchedDept, allowedRoles: deptRoles.map(r => r._id) });
                setStep(2);
                
                const roleNames = deptRoles.map(r => r.roleName).join(', ');
                addMessage('bot', `Got it. Department: ${matchedDept}. What role should be assigned? Available roles: ${roleNames}`);
            } else if (step === 2) {
                const role = roles.find(r => r.roleName.toLowerCase() === userInput.toLowerCase());
                if (!role) {
                    addMessage('bot', `I couldn't find a role named "${userInput}". Please try again.`);
                    return;
                }
                
                if (formData.allowedRoles && !formData.allowedRoles.includes(role._id)) {
                    addMessage('bot', `The "${role.roleName}" role does not belong to the ${formData.department} department. Please try again.`);
                    return;
                }

                setFormData({ ...formData, requestedRole: role._id });
                setStep(3);
                addMessage('bot', `Excellent. Role set to ${role.roleName}. Submitting Joiner request for approval...`);
                submitRequest({ ...formData, requestedRole: role._id }, 'JOINER');
            }
        } else if (flow === 'mover') {
            if (step === 0) {
                const emp = employees.find(e => e.name.toLowerCase() === userInput.toLowerCase() || e.employeeId.toLowerCase() === userInput.toLowerCase());
                if (!emp) {
                    addMessage('bot', `I couldn't find an employee named "${userInput}". Try their Employee ID.`);
                    return;
                }
                setFormData({ ...formData, employeeName: emp.name, targetUser: emp._id, currentRole: emp.role._id });
                setStep(1);
                const roleNames = roles.map(r => r.roleName).join(', ');
                addMessage('bot', `Found ${emp.name} (Current Role: ${emp.role.roleName}). What is their new role? Available roles: ${roleNames}`);
            } else if (step === 1) {
                const role = roles.find(r => r.roleName.toLowerCase() === userInput.toLowerCase());
                if (!role) {
                    addMessage('bot', `I couldn't find a role named "${userInput}". Please try again.`);
                    return;
                }
                setFormData({ ...formData, requestedRole: role._id });
                setStep(2);
                addMessage('bot', `Perfect. Changing ${formData.employeeName}'s role to ${role.roleName}. Submitting Mover request for approval...`);
                submitRequest({ ...formData, requestedRole: role._id }, 'MOVER');
            }
        } else if (flow === 'leaver') {
            if (step === 0) {
                const emp = employees.find(e => e.name.toLowerCase() === userInput.toLowerCase() || e.employeeId.toLowerCase() === userInput.toLowerCase());
                if (!emp) {
                    addMessage('bot', `I couldn't find an employee named "${userInput}". Try their Employee ID.`);
                    return;
                }
                setFormData({ ...formData, employeeName: emp.name, targetUser: emp._id });
                setStep(1);
                addMessage('bot', `Found ${emp.name}. Please confirm their resignation details or reason for leaving.`);
            } else if (step === 1) {
                setFormData({ ...formData, resignationDetails: userInput });
                setStep(2);
                addMessage('bot', `Thank you. Submitting Leaver request to revoke all access for ${formData.employeeName}...`);
                submitRequest({ ...formData, resignationDetails: userInput }, 'LEAVER');
            }
        }
    };

    const submitRequest = async (data, reqType) => {
        setLoading(true);
        try {
            await api.post('/workflows', { ...data, type: reqType });
            addMessage('bot', `Success! The ${reqType} request has been created and is now "Pending Approval" in the manager dashboard.`);
            setStep(-1); // End flow
        } catch (error) {
            addMessage('bot', `An error occurred: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 text-white flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">{flow ? flow.charAt(0).toUpperCase() + flow.slice(1) : 'Workflow'} Assistant</h2>
                        <p className="text-xs text-primary-100 opacity-90">Automated IAM Provisioning</p>
                    </div>
                </div>
                <button onClick={() => navigate('/dashboard')} className="text-sm bg-primary-800/40 hover:bg-primary-800/60 px-3 py-1.5 rounded-md transition-colors font-medium">
                    Cancel Flow
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${msg.sender === 'user' ? 'bg-primary-100 text-primary-700' : 'bg-white border border-gray-200 text-gray-700'}`}>
                            {msg.sender === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </div>
                        <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none text-gray-400 text-sm flex items-center gap-2 shadow-sm">
                            <div className="animate-pulse flex space-x-1">
                                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                                <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 shadow-sm relative z-10">
                <div className="flex gap-2 items-center bg-gray-50 rounded-lg pr-2 border border-gray-200 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                    <input
                        autoFocus
                        type="text"
                        className="flex-1 bg-transparent p-3 outline-none text-sm placeholder-gray-400"
                        placeholder={step === -1 ? 'Workflow complete.' : 'Type your answer here...'}
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={step === -1 || loading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={step === -1 || loading || !inputVal.trim()}
                        className="bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
