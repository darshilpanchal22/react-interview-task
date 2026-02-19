import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { LayoutDashboard, ShoppingBag, ShoppingCart, User, LogOut } from 'lucide-react';

export default function Layout({ children }) {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Products', path: '/products', icon: ShoppingBag },
        { name: 'Cart', path: '/cart', icon: ShoppingCart, badge: cart.length },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    return (
        <div className="flex min-h-screen bg-[#0f172a]">

            <aside className="w-64 border-r border-slate-800 flex flex-col p-6 fixed h-full bg-[#0f172a]">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-blue-600 p-2 rounded-lg text-white"><ShoppingBag size={20} /></div>
                    <span className="text-xl font-bold text-white tracking-tight"></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all ${location.pathname === link.path
                                ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20'
                                : 'text-slate-400 hover:bg-slate-800'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <link.icon size={20} /> {link.name}
                            </div>
                            {link.badge > 0 && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">{link.badge}</span>}
                        </Link>
                    ))}
                </nav>

                <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl mt-auto">
                    <LogOut size={20} /> Sign Out
                </button>
            </aside>
            ``
            {/* Main Content */}
            <main className="flex-1 ml-64 p-10 bg-[#0F172A]">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Hello, {user?.name}! 👋</h2>
                        <p className="text-slate-500 text-sm">Welcome back to your store</p>
                    </div>
                    {/* <div className="flex items-center gap-2 bg-[#1e293b] p-2 pr-4 rounded-full border border-slate-700">
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} className="w-12 h-8 rounded-full" />
                        <div className="text-sm font-bold text-white leading-none">{user?.name}</div>
                    </div> */}
                </header>
                {children}
            </main>
        </div>
    );
}