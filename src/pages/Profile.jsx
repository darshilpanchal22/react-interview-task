import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, CheckCircle } from 'lucide-react';

export default function Profile() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

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

        setUser(updatedUser);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white px-4">
                No user logged in.
            </div>
        );
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Profile Settings
            </h1>

            {success && (
                <div className="mb-6 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-sm sm:text-base">
                    <CheckCircle size={18} />
                    Profile updated successfully!
                </div>
            )}

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-[#1e293b] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-blue-500" size={20} />
                        <h3 className="font-semibold sm:font-bold text-white text-base sm:text-lg">
                            Personal Information
                        </h3>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">
                                    Full Name
                                </label>
                                <input
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">
                                    Email Address
                                </label>
                                <input
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm sm:text-base"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                <div className="bg-[#1e293b] border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center">

                    <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-slate-800 mb-4"
                        alt="avatar"
                    />

                    <h3 className="text-white font-semibold sm:font-bold text-base sm:text-lg break-words">
                        {name}
                    </h3>

                    <p className="text-slate-500 text-xs sm:text-sm mb-6 uppercase tracking-widest">
                        Pro Member
                    </p>

                    <div className="w-full pt-6 border-t border-slate-700 space-y-4">
                        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                            <Shield size={16} />
                            Account Verified
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
