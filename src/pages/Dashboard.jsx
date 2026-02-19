import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { user, logout, formattedTime } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    return (
        <div className="space-y-8">

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h1 className="text-2xl font-bold text-white">
                    Welcome back, {user?.name} 👋
                </h1>
                <p className="text-slate-400 mt-2">
                    Session expires in:
                    <span className="text-red-400 font-semibold ml-2">
                        {formattedTime}
                    </span>
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <h2 className="text-slate-400">Cart Items</h2>
                    <p className="text-3xl font-bold text-white mt-2">
                        {totalItems}
                    </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <h2 className="text-slate-400">Cart Total</h2>
                    <p className="text-3xl font-bold text-white mt-2">
                        ₹{totalPrice.toFixed(2)}
                    </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <h2 className="text-slate-400">Account Status</h2>
                    <p className="text-3xl font-bold text-green-400 mt-2">
                        Active
                    </p>
                </div>

            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-white font-semibold mb-4">
                    Quick Actions
                </h2>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => navigate("/products")}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition"
                    >
                        Browse Products
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition"
                    >
                        Go to Cart
                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition"
                    >
                        Edit Profile
                    </button>

                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

        </div>
    );
}
