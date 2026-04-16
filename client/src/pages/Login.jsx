import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(identifier, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e2e8f0] py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[420px] bg-[#f8fafc] rounded-3xl p-8 sm:p-10 shadow-xl overflow-hidden relative">
                <div className="relative z-10">
                    <h2 className="text-[34px] font-bold text-[#0f172a] tracking-tight leading-tight">
                        Welcome back
                    </h2>
                    <p className="mt-1 text-[15px] text-slate-500 font-medium">
                        Please enter your details to sign in.
                    </p>
                </div>

                <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
                    
                    {/* Segmented Control */}
                    <div className="relative flex bg-[#e2e8f0] p-1.5 rounded-full z-0 w-full sm:w-[96%]">
                        {/* Animated Background Pill */}
                        <div className="absolute top-1.5 bottom-1.5 left-1.5 right-1.5 -z-10">
                            <div 
                                className="w-1/3 h-full bg-[#030712] rounded-full shadow transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                style={{ transform: activeTab === 0 ? 'translateX(0%)' : activeTab === 1 ? 'translateX(100%)' : 'translateX(200%)' }}
                            ></div>
                        </div>

                        <button 
                            type="button" 
                            onClick={() => { setActiveTab(0); setIdentifier('alice@company.com'); setPassword('password123'); }} 
                            className={`flex-1 py-3 text-[14px] font-bold rounded-full transition-colors duration-200 cursor-pointer ${activeTab === 0 ? 'text-white' : 'text-[#64748b] hover:text-slate-900'}`}
                        >Employee</button>
                        <button 
                            type="button" 
                            onClick={() => { setActiveTab(1); setIdentifier('manager@company.com'); setPassword('password123'); }} 
                            className={`flex-1 py-3 text-[14px] font-bold rounded-full transition-colors duration-200 cursor-pointer ${activeTab === 1 ? 'text-white' : 'text-[#64748b] hover:text-slate-900'}`}
                        >Manager</button>
                        <button 
                            type="button" 
                            onClick={() => { setActiveTab(2); setIdentifier('admin@company.com'); setPassword('password123'); }} 
                            className={`flex-1 py-3 text-[14px] font-bold rounded-full transition-colors duration-200 cursor-pointer ${activeTab === 2 ? 'text-white' : 'text-[#64748b] hover:text-slate-900'}`}
                        >Admin</button>
                    </div>

                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5 pt-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="identifier" className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                id="identifier"
                                name="identifier"
                                type="text"
                                required
                                className="w-full bg-[#e2e8f0]/60 border border-transparent rounded-2xl px-5 py-3.5 text-[15px] font-medium text-slate-900 placeholder-slate-400/70 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none"
                                placeholder="demo@company.com"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full bg-[#e2e8f0]/60 border border-transparent rounded-2xl px-5 py-3.5 text-[20px] font-medium text-slate-900 placeholder-slate-400/70 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 transition-all outline-none tracking-[0.2em]"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4 pb-2">
                        <button
                            type="submit"
                            className="w-full bg-[#030712] text-white flex justify-center items-center gap-2 py-4 rounded-full text-[16px] font-bold hover:bg-black hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all outline-none focus:ring-4 focus:ring-slate-900/20"
                        >
                            Sign In <span className="text-[16px] font-bold ml-1 mt-[1px]">-&gt;</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
