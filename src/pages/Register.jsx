import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ShoppingBag } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Saving to localStorage as our Mock DB

        localStorage.setItem('registered_user', JSON.stringify(formData));
        alert("Registration Successful! Please Login.");
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="w-full max-w-[420px] bg-[#1e293b] border border-slate-800 rounded-2xl p-10 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-xl text-white mb-4">
                        <ShoppingBag size={28} />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-slate-400 mt-2 text-center">Join our community today</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-300">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="text" required placeholder="John Doe"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="email" required placeholder="name@company.com"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-slate-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="password" required placeholder="••••••••"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-600/20 mt-4">
                        Create Account &rarr;
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm mt-8">
                    Already have an account? <Link to="/login" className="text-blue-500 font-bold hover:underline">Sign in instead</Link>
                </p>
            </div>
        </div>
    );
}