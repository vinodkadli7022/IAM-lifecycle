import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, FileText, Settings, UserPlus, LogOut, ShieldAlert } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Joiner Requests', path: '/requests/joiner', icon: UserPlus, roles: ['Manager', 'System Administrator'] },
        { name: 'Mover Requests', path: '/requests/mover', icon: Users, roles: ['Manager', 'System Administrator'] },
        { name: 'Leaver Requests', path: '/requests/leaver', icon: Shield, roles: ['Manager', 'System Administrator'] },
        { name: 'Employees', path: '/employees', icon: Users, roles: ['Manager', 'System Administrator'] },
        { name: 'Role Templates', path: '/roles', icon: Settings, roles: ['System Administrator'] },
        { name: 'Audit Logs', path: '/audit', icon: FileText, roles: ['Manager', 'System Administrator'] },
    ];

    const visibleNavs = navItems.filter(item => !item.roles || item.roles.includes(user?.userType));

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#0B0F19] min-h-screen text-slate-300 flex flex-col border-r border-slate-800">
                <div className="p-5 border-b border-slate-800/60">
                    <h1 className="text-xl font-bold flex items-center gap-2 text-white tracking-tight">
                        <ShieldAlert className="text-primary-500 h-6 w-6" />
                        ILAP
                    </h1>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium uppercase tracking-wider">Identity Lifecycle</p>
                </div>

                <div className="p-5 border-b border-slate-800/60 bg-white/[0.02]">
                    <p className="text-sm font-semibold text-white">{user?.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        <p className="text-xs text-slate-400 font-medium">{user?.userType}</p>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto mt-2">
                    {visibleNavs.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary-500/10 text-primary-400 shadow-sm' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                }`
                            }
                        >
                            <item.icon className="h-[18px] w-[18px]" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800/60 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                    >
                        <LogOut className="h-[18px] w-[18px]" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f8fafc]">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                        <h1 className="text-xl flex items-center gap-2 font-bold text-slate-800 tracking-tight">
                            {window.location.pathname === '/' ? 'Overview Dashboard' : 'Workspace'}
                        </h1>
                        <div className="flex items-center gap-3">
                             <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm">
                                 <span className="text-sm font-bold text-slate-600">{user?.name?.charAt(0)}</span>
                             </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
