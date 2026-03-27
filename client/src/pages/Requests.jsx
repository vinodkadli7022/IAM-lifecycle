import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const Requests = ({ type }) => {
    const { api } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState('');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/workflows?type=${type}`);
            setRequests(res.data);
        } catch (err) {
            setError('Failed to fetch requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [type, api]);

    const handleAction = async (id, action) => {
        setActionLoading(id);
        try {
            await api.put(`/workflows/${id}/${action}`);
            await fetchRequests();
        } catch (err) {
            setError(`Failed to ${action} request: ` + (err.response?.data?.message || err.message));
        } finally {
            setActionLoading(null);
        }
    };

    const StatusIcon = ({ status }) => {
        if (status === 'Approved') return <CheckCircle className="h-5 w-5 text-emerald-500" />;
        if (status === 'Rejected') return <XCircle className="h-5 w-5 text-rose-500" />;
        return <Clock className="h-5 w-5 text-amber-500" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{type.charAt(0) + type.slice(1).toLowerCase()} Requests</h2>
                    <p className="text-sm text-gray-500 mt-1">Review and manage lifecycle approvals</p>
                </div>
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium border border-primary-100">
                    {requests.filter(r => r.status === 'Pending').length} Pending
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading requests...</div>
            ) : requests.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
                    <p className="text-sm text-gray-500 mt-1">There are no {type.toLowerCase()} requests matching your criteria.</p>
                </div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {requests.map(req => (
                            <li key={req._id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2">
                                            <StatusIcon status={req.status} />
                                            <h3 className="text-md font-semibold text-gray-900">{req.employeeName}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {req.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-2">
                                            {req.department && <p><span className="font-medium text-gray-800">Department:</span> {req.department}</p>}
                                            {req.currentRole && <p><span className="font-medium text-gray-800">Current Role:</span> {req.currentRole.roleName}</p>}
                                            {req.requestedRole && <p><span className="font-medium text-gray-800">Requested Role:</span> {req.requestedRole.roleName}</p>}
                                            {req.resignationDetails && <p className="col-span-full"><span className="font-medium text-gray-800">Resignation Details:</span> {req.resignationDetails}</p>}
                                            <p><span className="font-medium text-gray-800">Requested By:</span> {req.requestedBy?.name}</p>
                                            <p><span className="font-medium text-gray-800">Date:</span> {new Date(req.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {req.status === 'Pending' && (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleAction(req._id, 'approve')}
                                                disabled={actionLoading === req._id}
                                                className="btn-primary bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 whitespace-nowrap shadow-sm text-sm"
                                            >
                                                {actionLoading === req._id ? 'Approving...' : 'Approve'}
                                            </button>
                                            <button
                                                onClick={() => handleAction(req._id, 'reject')}
                                                disabled={actionLoading === req._id}
                                                className="btn-secondary text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:ring-rose-500 whitespace-nowrap shadow-sm text-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Requests;
