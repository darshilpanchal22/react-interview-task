import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, updateQty, removeFromCart, total } = useCart();

    if (cart.length === 0) return (
        <div className="text-center py-20 bg-[#1e293b] rounded-3xl border border-slate-800 border-dashed">
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <Link to="/products" className="text-blue-500 hover:underline">Continue Shopping</Link>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-2xl font-bold text-white mb-6">Shopping Cart</h1>
                {cart.map(item => (
                    <div key={item.id} className="bg-[#1e293b] border border-slate-800 p-4 rounded-2xl flex items-center gap-6">
                        <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center">
                            <img src={item.image} className="max-h-full object-contain" alt="" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold">{item.title}</h3>
                            <p className="text-slate-500 text-xs mt-1">${item.price}</p>
                        </div>
                        <div className="flex items-center bg-slate-900 rounded-lg p-1">
                            <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-white"><Minus size={16} /></button>
                            <span className="w-8 text-center text-white text-sm font-bold">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-white"><Plus size={16} /></button>
                        </div>
                        <div className="text-right min-w-[80px]">
                            <p className="text-white font-bold">${(item.price * item.qty).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 mt-2"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="bg-[#1e293b] border border-slate-800 p-6 rounded-3xl">
                    <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between"><span>Subtotal</span><span className="text-white">${total.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span className="text-emerald-500">FREE</span></div>
                        <div className="border-t border-slate-700 pt-4 flex justify-between text-lg font-bold">
                            <span className="text-white">Total</span><span className="text-blue-500">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl mt-8 transition-all">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}