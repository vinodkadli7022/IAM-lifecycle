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
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target User</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLogs.map((log) => (
                                    <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2 font-mono">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {log.user}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={log.details}>
                                            {log.details}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {log.performedBy}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredLogs.length === 0 && (
                            <div className="text-center py-8 text-gray-500 text-sm">No logs found matching your search.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditLog;
