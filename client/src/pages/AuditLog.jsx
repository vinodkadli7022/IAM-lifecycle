import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FileText, Clock, Search } from 'lucide-react';

const AuditLog = () => {
    const { api } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get('/audit');
                setLogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [api]);

    const filteredLogs = logs.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="h-6 w-6 text-primary-600" />
                        System Audit Logs
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Traceability for all identity and access management events</p>
                </div>

                <div className="relative w-full sm:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="input-field pl-10 bg-gray-50"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading audit trail...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50/80 backdrop-blur-sm">
                                <tr>
                                    <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b-2 border-primary-100">Timestamp</th>
                                    <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b-2 border-primary-100">Action Event</th>
                                    <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b-2 border-primary-100">Target User</th>
                                    <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b-2 border-primary-100 w-full">Details</th>
                                    <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b-2 border-primary-100">Initiator</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredLogs.map((log) => (
                                    <tr key={log._id} className="hover:bg-primary-50/50 transition-colors group cursor-default">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center gap-2 font-mono group-hover:text-primary-600 transition-colors">
                                            <Clock className="h-4 w-4" />
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-[11px] font-bold uppercase tracking-wider rounded-md border ${log.action.includes('APPROVED') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : log.action.includes('REJECTED') ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-primary-50 text-primary-700 border-primary-200'}`}>
                                                {log.action.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900 flex items-center gap-3">
                                            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs text-gray-600 shadow-inner">{log.user.charAt(0).toUpperCase()}</div>
                                            {log.user}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-600 max-w-xs sm:max-w-sm xl:max-w-md truncate group-hover:text-gray-900 transition-colors" title={log.details}>
                                            {log.details}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 font-medium font-sans">
                                            {log.performedBy}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredLogs.length === 0 && (
                            <div className="text-center py-12">
                                <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">No logs found matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditLog;
