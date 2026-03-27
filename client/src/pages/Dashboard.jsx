import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Users, Shield, ArrowRight, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ title, description, icon: Icon, onClick, colorClass }) => (
    <button
        onClick={onClick}
        className={`card hover:shadow-lg transition-all text-left flex items-start gap-4 group border-t-4 ${colorClass}`}
    >
        <div className={`p-3 rounded-lg ${colorClass.replace('border-', 'bg-').replace('500', '100')} text-${colorClass.split('-')[1]}-600`}>
            <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {title}
                <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
    </button>
);

const Dashboard = () => {
    const { user, api } = useContext(AuthContext);
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({ totalEmployees: 0, pendingRequests: 0, totalRoles: 0 });
    const [recentLogs, setRecentLogs] = useState([]);

    useEffect(() => {
        if (user?.userType !== 'Employee') {
            const fetchMetrics = async () => {
                try {
                    const [empRes, reqRes, roleRes, logRes] = await Promise.all([
                        api.get('/employees'),
                        api.get('/workflows?status=Pending'),
                        api.get('/roles'),
                        api.get('/audit')
                    ]);
                    setMetrics({
                        totalEmployees: empRes.data.length,
                        pendingRequests: reqRes.data.length,
                        totalRoles: roleRes.data.length
                    });
                    setRecentLogs(logRes.data.slice(0, 5));
                } catch (error) {
                    console.error("Failed to load metrics", error);
                }
            };
            fetchMetrics();
        }
    }, [user, api]);

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-dark-800 to-dark-900 rounded-lg p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 pt-4 pr-4">
                    <Shield className="h-32 w-32" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight">Welcome to ILAP, {user?.name}</h2>
                    <p className="mt-2 text-primary-200 text-lg">
                        Role: {user?.role?.roleName || user?.userType} {user?.department && `• Department: ${user.department}`}
                    </p>
                </div>
            </div>

            {user?.userType !== 'Employee' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ActionButton
                        title="Joiner Workflow"
                        description="Onboard a new employee and assign roles."
                        icon={UserPlus}
                        colorClass="border-emerald-500"
                        onClick={() => navigate('/chatbot?flow=joiner')}
                    />
                    <ActionButton
                        title="Mover Workflow"
                        description="Transfer context or change an employee's role."
                        icon={Users}
                        colorClass="border-blue-500"
                        onClick={() => navigate('/chatbot?flow=mover')}
                    />
                    <ActionButton
                        title="Leaver Workflow"
                        description="Safely offboard an employee and revoke access."
                        icon={Shield}
                        colorClass="border-rose-500"
                        onClick={() => navigate('/chatbot?flow=leaver')}
                    />
                </div>
            )}

            {user?.userType !== 'Employee' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="card lg:col-span-2 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <Activity className="h-5 w-5 text-gray-500" />
                            Recent System Activity
                        </h3>
                        <div className="space-y-4">
                            {recentLogs.length > 0 ? recentLogs.map(log => (
                                <div key={log._id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-md transition-colors border border-transparent hover:border-gray-200">
                                    <div className="bg-gray-100 p-2 rounded-full">
                                        <Clock className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                                        <p className="text-xs text-gray-500">{log.details}</p>
                                        <p className="text-xs text-gray-400 mt-1">By {log.performedBy} • {new Date(log.timestamp).toLocaleString()}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-gray-500">No recent activity.</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group p-6 transition-all hover:shadow-md">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Employees</h3>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">{metrics.totalEmployees}</p>
                                </div>
                                <div className="p-3 bg-primary-50 rounded-xl text-primary-600 group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-300">
                                    <Users className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm mt-4 text-emerald-600 font-medium">
                                <ArrowRight className="h-4 w-4 -rotate-45" /> Active in system
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group p-6 transition-all hover:shadow-md">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Approvals</h3>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">{metrics.pendingRequests}</p>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                                    <Clock className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm mt-4 text-amber-600 font-medium">
                                <Activity className="h-4 w-4" /> Awaiting action
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {user?.userType === 'Employee' && (
                <div className="card mt-6">
                    <h3 className="text-lg font-semibold mb-4">My Access Permissions</h3>
                    {user.permissions && user.permissions.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {user.permissions.map(perm => (
                                <div key={perm._id || perm.name} className="border border-gray-200 p-4 rounded-md flex items-center gap-3 bg-white hover:border-primary-300 transition-colors">
                                    <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{perm.name}</p>
                                        <p className="text-xs text-gray-500">{perm.system}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">You currently have no active permissions assigned.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
