import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Users, Briefcase, Mail, ShieldAlert } from 'lucide-react';

const Employees = () => {
    const { api } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await api.get('/employees');
                setEmployees(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, [api]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary-600" />
                        Employee Directory
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">View all active and disabled employees</p>
                </div>
                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {employees.length} Total Users
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading directory...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map(emp => (
                        <div key={emp._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex justify-center items-center text-white font-bold text-lg shadow-inner group-hover:scale-110 transition-transform">
                                        {emp.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">{emp.name}</h3>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">{emp.employeeId}</p>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold border ${emp.accountStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                        emp.accountStatus === 'Disabled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}>
                                    {emp.accountStatus}
                                </span>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-50 transition-colors"><Mail className="h-4 w-4" /></div>
                                        <a href={`mailto:${emp.email}`} className="truncate hover:underline font-medium">{emp.email}</a>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-50 transition-colors"><Briefcase className="h-4 w-4" /></div>
                                        <span className="font-medium">{emp.department || 'Unassigned'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors"><ShieldAlert className="h-4 w-4" /></div>
                                        <span className="font-medium bg-gray-50 px-2.5 py-0.5 rounded text-gray-700 border border-gray-100">{emp.role?.roleName || 'No Role'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-50">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Provisioned Permissions</p>
                                <div className="flex flex-wrap gap-2">
                                    {emp.permissions?.slice(0, 3).map(p => (
                                        <span key={p._id} className="inline-block bg-white border border-gray-200 px-2.5 py-1 rounded-md text-xs font-medium text-gray-600 shadow-sm hover:border-primary-300 hover:text-primary-600 cursor-default transition-colors">
                                            {p.name}
                                        </span>
                                    ))}
                                    {emp.permissions?.length > 3 && (
                                        <span className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200 px-2.5 py-1 rounded-md text-xs font-bold text-gray-600 shadow-sm">
                                            +{emp.permissions.length - 3}
                                        </span>
                                    )}
                                    {(!emp.permissions || emp.permissions.length === 0) && (
                                        <span className="text-xs text-gray-400 italic">No permissions assigned</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Employees;
