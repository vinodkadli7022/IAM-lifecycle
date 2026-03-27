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
                        <div key={emp._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200 flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{emp.name}</h3>
                                    <p className="text-sm text-gray-500 font-mono mt-0.5">{emp.employeeId}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${emp.accountStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                        emp.accountStatus === 'Disabled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                            'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}>
                                    {emp.accountStatus}
                                </span>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <a href={`mailto:${emp.email}`} className="text-primary-600 hover:underline">{emp.email}</a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Briefcase className="h-4 w-4 text-gray-400" />
                                    {emp.department || 'No department'}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <ShieldAlert className="h-4 w-4 text-gray-400" />
                                    <span className="font-medium">{emp.role?.roleName || 'No Role Assigned'}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500 font-medium mb-2">Active Permissions:</p>
                                <div className="flex flex-wrap gap-1">
                                    {emp.permissions?.slice(0, 3).map(p => (
                                        <span key={p._id} className="inline-block bg-white border border-gray-200 px-2 py-1 rounded text-xs text-gray-600">
                                            {p.name}
                                        </span>
                                    ))}
                                    {emp.permissions?.length > 3 && (
                                        <span className="inline-block bg-gray-200 px-2 py-1 rounded text-xs text-gray-600">
                                            +{emp.permissions.length - 3} more
                                        </span>
                                    )}
                                    {(!emp.permissions || emp.permissions.length === 0) && (
                                        <span className="text-xs text-gray-400">None</span>
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
