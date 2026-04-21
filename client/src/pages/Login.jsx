import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronLeft, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white selection:bg-black selection:text-white">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
                
                .login-container {
                    font-family: 'Space Grotesk', sans-serif;
                }
                .mono {
                    font-family: 'Space Mono', monospace;
                }
                .brutalist-input {
                    border-radius: 0;
                    border: 1px solid #E5E5E5;
                    transition: all 0.2s;
                }
                .brutalist-input:focus {
                    border-color: #111111;
                    outline: none;
                    box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
                }
                .brutalist-btn {
                    border-radius: 0;
                    transition: all 0.2s;
                }
                .brutalist-btn:hover {
                    box-shadow: 6px 6px 0px rgba(0,0,0,0.1);
                    transform: translate(-2px, -2px);
                }
                .role-selector {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    border: 1px solid #111111;
                    padding: 2px;
                }
                .role-btn {
                    padding: 10px;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    transition: all 0.2s;
                    border-radius: 0;
                }
                .role-btn.active {
                    background: #111111;
                    color: #FFFFFF;
                }
                .grid-pattern {
                    background-image: radial-gradient(#333 1px, transparent 1px);
                    background-size: 32px 32px;
                    opacity: 0.2;
                }
                `}
            </style>

            {/* Left Panel: Brand & Technical Visual */}
            <div className="hidden lg:flex flex-col bg-[#111111] text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern"></div>
                
                {/* Back to Site */}
                <button 
                  onClick={() => navigate('/')}
                  className="relative z-10 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mono text-[12px] uppercase tracking-widest mb-24 w-fit"
                >
                    <ChevronLeft size={14} /> Back to specifications
                </button>

                <div className="relative z-10 mt-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 border-2 border-red-500 flex items-center justify-center font-bold text-2xl">
                            I
                        </div>
                        <h1 className="text-4xl font-bold tracking-tighter">ILAP</h1>
                    </div>
                    
                    <h2 className="text-6xl font-medium leading-[1.1] mb-8 text-zinc-100 uppercase tracking-tight">
                        SYSTEM<br />CONTROL<br />ACCESS.
                    </h2>
                    
                    <p className="text-zinc-500 max-w-sm mono text-sm leading-relaxed mb-12">
                        // SECURE IDENTITY LIFECYCLE AUTOMATION
                        // ZERO-TRUST ARCHITECTURE V.2.4
                        // SYSTEM STATUS: LOGGED_OUT
                    </p>

                    <div className="border-t border-zinc-800 pt-8 flex gap-12">
                        <div>
                            <div className="text-zinc-600 mono text-[11px] uppercase tracking-widest mb-1">Architecture</div>
                            <div className="text-zinc-300 text-sm font-medium">RBAC / 256-BIT</div>
                        </div>
                        <div>
                            <div className="text-zinc-600 mono text-[11px] uppercase tracking-widest mb-1">Protocol</div>
                            <div className="text-zinc-300 text-sm font-medium">JML-AUTOMATED</div>
                        </div>
                    </div>
                </div>

                {/* Decorative Technical ID */}
                <div className="absolute top-12 right-12 mono text-[10px] text-zinc-700 writing-vertical-rl tracking-[0.5em] uppercase">
                    ID-SYS-LOGIN-AUTH-0992
                </div>
            </div>

            {/* Right Panel: Login Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-24 bg-white login-container">
                <div className="w-full max-w-sm">
                    {/* ID Header for Mobile */}
                    <div className="lg:hidden flex items-center gap-2 mb-12">
                        <div className="w-8 h-8 border border-red-500 flex items-center justify-center font-bold text-lg">I</div>
                        <span className="font-bold tracking-tighter">ILAP</span>
                    </div>

                    <div className="mb-12">
                        <span className="mono text-[12px] text-zinc-500 uppercase tracking-widest mb-4 block">Authentication Module</span>
                        <h3 className="text-4xl font-medium uppercase tracking-tight text-[#111111]">Welcome Back</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Role Selector Header */}
                        <div className="space-y-4">
                            <label className="mono text-[12px] text-zinc-400 uppercase tracking-widest block">System Identity Role</label>
                            <div className="role-selector">
                                <button 
                                    type="button" 
                                    onClick={() => { setActiveTab(0); setIdentifier('alice@company.com'); setPassword('password123'); }}
                                    className={`role-btn ${activeTab === 0 ? 'active' : 'text-zinc-400 hover:text-black'}`}
                                >Employee</button>
                                <button 
                                    type="button" 
                                    onClick={() => { setActiveTab(1); setIdentifier('manager@company.com'); setPassword('password123'); }}
                                    className={`role-btn ${activeTab === 1 ? 'active' : 'text-zinc-400 hover:text-black'}`}
                                >Manager</button>
                                <button 
                                    type="button" 
                                    onClick={() => { setActiveTab(2); setIdentifier('admin@company.com'); setPassword('password123'); }}
                                    className={`role-btn ${activeTab === 2 ? 'active' : 'text-zinc-400 hover:text-black'}`}
                                >Admin</button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-4 mono text-[11px] uppercase tracking-tight">
                                ERROR: {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="identifier" className="mono text-[12px] text-zinc-500 uppercase tracking-widest block">
                                    Identity / Email
                                </label>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    required
                                    className="w-full brutalist-input px-5 py-4 text-base focus:ring-0"
                                    placeholder="demo@system.auth"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="password" className="mono text-[12px] text-zinc-500 uppercase tracking-widest block">
                                    Auth Key / Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full brutalist-input px-5 py-4 text-base focus:ring-0 mono"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#111111] text-white py-5 brutalist-btn flex items-center justify-center gap-3 font-bold uppercase text-xs tracking-[0.2em]"
                            >
                                Execute Sign In <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>

                    <p className="mt-12 mono text-[11px] text-zinc-400 text-center leading-relaxed">
                        // SECURE ACCESS CONTROL PROTOCOL INITIATED<br />
                        // UNAUTHORIZED ACCESS IS LOGGED AND REPORTED
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
