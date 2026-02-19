import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, CheckCircle } from 'lucide-react';

export default function Profile() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    // Sync form when user loads
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!user) return;

        const updatedUser = {
            ...user,
            name: name.trim(),
            email: email.trim()
        };

        setUser(updatedUser); // updates context + localStorage automatically

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    if (!user) {
        return (
            <div className="text-white text-center mt-10">
                No user logged in.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>

            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle size={20} /> Profile updated successfully!
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT SIDE */}
                <div className="md:col-span-2 bg-[#1e293b] border border-slate-800 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <User className="text-blue-500" />
                        <h3 className="font-bold text-white">Personal Information</h3>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Full Name</label>
                                <input
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Email Address</label>
                                <input
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center">
                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                        className="w-24 h-24 rounded-full border-4 border-slate-800 mb-4"
                        alt=""
                    />
                    <h3 className="text-white font-bold">{name}</h3>
                    <p className="text-slate-500 text-xs mb-6 uppercase tracking-widest">
                        Pro Member
                    </p>

                    <div className="w-full pt-6 border-t border-slate-700 space-y-4">
                        <div className="flex items-center gap-3 text-slate-400 text-sm">
                            <Shield size={16} /> Account Verified
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
