import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Clock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(email, password)) navigate('/dashboard');
        else setError('Invalid email or password. Please try again.');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="w-full max-w-[420px] bg-[#1e293b] border border-slate-800 rounded-2xl p-10 shadow-2xl">
                <h1 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h1>
                <p className="text-slate-400 text-center mb-8">Enter your details to access your dashboard.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="email" required placeholder="name@company.com"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg flex items-center gap-2 text-xs">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}

                    <div className="bg-blue-600/10 border border-blue-600/20 text-blue-400 p-3 rounded-lg flex items-center justify-center gap-2 text-xs font-medium">
                        <Clock size={14} /> Session expires in 5 minutes
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-600/20">
                        Sign In &rarr;
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm mt-8">
                    Don't have an account? <Link to="/register" className="text-blue-500 font-bold hover:underline">Create an account</Link>
                </p>
            </div>
        </div>
    );
}