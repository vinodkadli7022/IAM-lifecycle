import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Settings, Plus, Edit, Trash2, Save, X, ShieldAlert, Key } from 'lucide-react';

const RoleManager = () => {
    const { api } = useContext(AuthContext);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingRole, setEditingRole] = useState(null);
    const [newRoleName, setNewRoleName] = useState('');
    const [selectedPerms, setSelectedPerms] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    
    // New Permission State
    const [newPermName, setNewPermName] = useState('');
    const [newPermSystem, setNewPermSystem] = useState('');
    const [isCreatingPerm, setIsCreatingPerm] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [roleRes, permRes] = await Promise.all([
                api.get('/roles'),
                api.get('/permissions')
            ]);
            setRoles(roleRes.data);
            setPermissions(permRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [api]);

    const handleEdit = (role) => {
        setEditingRole(role._id);
        setNewRoleName(role.roleName);
        setSelectedPerms(role.permissions.map(p => p._id));
        setIsCreating(false);
    };

    const handleCreateNew = () => {
        setEditingRole('NEW');
        setNewRoleName('');
        setSelectedPerms([]);
        setIsCreating(true);
    };

    const handleCancel = () => {
        setEditingRole(null);
        setNewRoleName('');
        setSelectedPerms([]);
        setIsCreating(false);
    };

    const handleTogglePerm = (permId) => {
        if (selectedPerms.includes(permId)) {
            setSelectedPerms(selectedPerms.filter(id => id !== permId));
        } else {
            setSelectedPerms([...selectedPerms, permId]);
        }
    };

    const handleCreatePermission = async (e) => {
        e.preventDefault();
        if (!newPermName || !newPermSystem) return;
        setIsCreatingPerm(true);
        try {
            await api.post('/permissions', { name: newPermName, system: newPermSystem, description: `Access to ${newPermSystem}` });
            setNewPermName('');
            setNewPermSystem('');
            await fetchData();
        } catch (err) {
            alert('Error creating permission: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsCreatingPerm(false);
        }
    };

    const handleSave = async () => {
        try {
            if (isCreating) {
                await api.post('/roles', { roleName: newRoleName, permissions: selectedPerms });
            } else {
                await api.put(`/roles/${editingRole}`, { roleName: newRoleName, permissions: selectedPerms });
            }
            await fetchData();
            handleCancel();
        } catch (err) {
            alert('Error saving role: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this role template?")) return;
        try {
            await api.delete(`/roles/${id}`);
            await fetchData();
        } catch (err) {
            alert('Error deleting role: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Settings className="h-6 w-6 text-primary-600" />
                        Role Template Engine
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Manage RBAC roles and system permissions mapping</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Create Role
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading roles...</div>
                    ) : (
                        roles.map(role => (
                            <div key={role._id} className={`card border-l-4 transition-all ${editingRole === role._id ? 'border-primary-500 ring-2 ring-primary-100' : 'border-gray-200 hover:border-primary-300'}`}>
                                {editingRole === role._id ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="w-full max-w-sm">
                                                <label className="label-text">Role Name</label>
                                                <input
                                                    type="text"
                                                    className="input-field"
                                                    value={newRoleName}
                                                    onChange={(e) => setNewRoleName(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={handleCancel} className="btn-secondary px-3 py-1.5 flex items-center gap-1 text-sm"><X className="h-4 w-4" /> Cancel</button>
                                                <button onClick={handleSave} className="btn-primary px-3 py-1.5 flex items-center gap-1 text-sm"><Save className="h-4 w-4" /> Save</button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="label-text mb-2">Assign Permissions</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-md border border-gray-100 max-h-60 justify-start items-start overflow-y-auto w-full flex-wrap">
                                                {permissions.map(perm => (
                                                    <label key={perm._id} className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${selectedPerms.includes(perm._id) ? 'bg-primary-50 border-primary-200' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                                        <input
                                                            type="checkbox"
                                                            className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                                            checked={selectedPerms.includes(perm._id)}
                                                            onChange={() => handleTogglePerm(perm._id)}
                                                        />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{perm.name}</p>
                                                            <p className="text-xs text-gray-500">{perm.system}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{role.roleName}</h3>
                                                <p className="text-sm text-gray-500 mb-4">{role.permissions.length} Permissions Assigned</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(role)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDelete(role._id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {role.permissions.map(p => (
                                                <span key={p._id} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded border border-gray-200 text-xs font-medium">
                                                    {p.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {editingRole === 'NEW' && (
                        <div className="card space-y-4 border-l-4 border-primary-500 ring-2 ring-primary-100 animate-pulse-light">
                            <div className="flex justify-between items-start">
                                <div className="w-full max-w-sm">
                                    <label className="label-text">New Role Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="e.g. Frontend Developer"
                                        value={newRoleName}
                                        onChange={(e) => setNewRoleName(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleCancel} className="btn-secondary px-3 py-1.5 flex items-center gap-1 text-sm"><X className="h-4 w-4" /> Cancel</button>
                                    <button onClick={handleSave} className="btn-primary px-3 py-1.5 flex items-center gap-1 text-sm"><Save className="h-4 w-4" /> Create</button>
                                </div>
                            </div>
                            <div>
                                <label className="label-text mb-2">Assign Permissions</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-md border border-gray-100 max-h-60 overflow-y-auto justify-start items-start w-full">
                                    {permissions.map(perm => (
                                        <label key={perm._id} className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${selectedPerms.includes(perm._id) ? 'bg-primary-50 border-primary-200' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                            <input
                                                type="checkbox"
                                                className="mt-1 h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                                                checked={selectedPerms.includes(perm._id)}
                                                onChange={() => handleTogglePerm(perm._id)}
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{perm.name}</p>
                                                <p className="text-xs text-gray-500">{perm.system}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="card h-fit bg-primary-50 border-none shadow-sm space-y-4">
                        <h3 className="font-semibold text-primary-900">How Role Templates Work</h3>
                        <p className="text-sm text-primary-800">
                            Role Templates define the baseline access permissions for job titles.
                            When a template is updated, the **Role Engine** automatically recalculates and applies these changes to all users currently holding that role.
                        </p>
                        <div className="bg-white p-3 rounded shadow-sm text-sm border border-primary-100 flex items-start gap-3">
                            <ShieldAlert className="h-5 w-5 text-primary-500 shrink-0" />
                            <p className="text-gray-600">This ensures least-privilege compliance continuously across the organization.</p>
                        </div>
                    </div>
                    
                    <div className="card h-fit bg-white border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Key className="h-5 w-5 text-gray-600" />
                            Add Custom Permission
                        </h3>
                        <p className="text-xs text-gray-500">
                            Register a new granular system permission to your database that can be assigned to Role Templates.
                        </p>
                        <form onSubmit={handleCreatePermission} className="space-y-3">
                            <div>
                                <label className="text-xs font-medium text-gray-700 block mb-1">Permission Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="input-field py-1.5 text-sm" 
                                    placeholder="e.g. EC2 Deploy Access" 
                                    value={newPermName}
                                    onChange={e => setNewPermName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-700 block mb-1">Target System</label>
                                <input 
                                    type="text" 
                                    required
                                    className="input-field py-1.5 text-sm" 
                                    placeholder="e.g. AWS" 
                                    value={newPermSystem}
                                    onChange={e => setNewPermSystem(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isCreatingPerm}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm py-2 rounded-md transition-colors"
                            >
                                {isCreatingPerm ? 'Creating...' : 'Register Permission'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleManager;
