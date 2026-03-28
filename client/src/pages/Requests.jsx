import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const Requests = ({ type }) => {
    const { api, user } = useContext(AuthContext);
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
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
                    <p className="text-sm text-gray-500 mt-1">There are no {type.toLowerCase()} requests matching your criteria.</p>
                </div>
            ) : (
                <div className="space-y-4">
                        {requests.map(req => (
                            <div key={req._id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-primary-300 hover:shadow-md transition-all duration-300 group flex flex-col xl:flex-row xl:items-center justify-between gap-6 overflow-hidden relative">
                                {/* Left/Main side */}
                                <div className="flex items-start xl:items-center gap-5 flex-1">
                                    <div className={`shrink-0 h-10 w-10 sm:h-14 sm:w-14 rounded-full flex justify-center items-center text-white font-bold sm:text-lg shadow-inner bg-gradient-to-br ${req.status === 'Approved' ? 'from-emerald-400 to-emerald-600' : req.status === 'Rejected' ? 'from-rose-400 to-rose-600' : 'from-amber-400 to-amber-600'}`}>
                                        {req.employeeName.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="space-y-1.5 flex-1 w-full">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-gray-900 leading-none tracking-tight">{req.employeeName}</h3>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-sm font-medium text-gray-500">{type.charAt(0) + type.slice(1).toLowerCase()} Workflow</span>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-2 text-sm mt-3">
                                            {req.department && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-700 font-medium shadow-sm">
                                                    <span className="text-gray-400 font-normal">Dept:</span> {req.department}
                                                </span>
                                            )}
                                            {req.currentRole && (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-700 font-medium shadow-sm whitespace-nowrap">
                                                    <span className="text-gray-400 font-normal">Current:</span> {req.currentRole.roleName}
                                                </span>
                                            )}
                                            {req.requestedRole && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary-50 border border-primary-200 text-primary-800 font-bold shadow-sm whitespace-nowrap">
                                                    <span className="text-primary-500 font-medium">Requested Role:</span> {req.requestedRole.roleName}
                                                </span>
                                            )}
                                        </div>

                                        {req.resignationDetails && (
                                            <div className="mt-3">
                                                <p className="text-sm text-rose-700 bg-rose-50/80 px-3 py-2 rounded-md border border-rose-100 inline-block shadow-sm">
                                                    <span className="font-bold uppercase text-[10px] tracking-widest text-rose-500 block mb-0.5">Offboarding Reason</span> 
                                                    {req.resignationDetails}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-4 font-medium">
                                            <Clock className="h-3.5 w-3.5" />
                                            Requested by {req.requestedBy?.name} on {new Date(req.createdAt).toLocaleDateString()}
                                            <span className="ml-2 font-mono text-[10px] text-gray-300">ID: {req._id.slice(-6)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Status or Actions */}
                                <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-4 xl:border-l border-gray-100 xl:pl-6 pt-4 xl:pt-0 mt-2 xl:mt-0 border-t xl:border-t-0">
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border flex items-center gap-1.5 w-fit ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm' : 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'}`}>
                                        <StatusIcon status={req.status} /> {req.status}
                                    </span>

                                    {req.status === 'Pending' && user?.userType === 'System Administrator' && (
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <button
                                                onClick={() => handleAction(req._id, 'approve')}
                                                disabled={actionLoading === req._id}
                                                className="btn-primary py-2 px-5 shadow-sm bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/20 hover:shadow-lg focus:ring-emerald-500 whitespace-nowrap text-sm flex-1 sm:flex-none transition-all"
                                            >
                                                {actionLoading === req._id ? 'Approving...' : 'Approve'}
                                            </button>
                                            <button
                                                onClick={() => handleAction(req._id, 'reject')}
                                                disabled={actionLoading === req._id}
                                                className="btn-secondary py-2 px-5 shadow-sm text-rose-600 border-rose-200 bg-white hover:bg-rose-50 hover:border-rose-300 focus:ring-rose-500 whitespace-nowrap text-sm flex-1 sm:flex-none transition-all"
                                            >
                                                Reject 
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Requests;
