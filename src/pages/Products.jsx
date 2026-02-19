import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Search } from 'lucide-react';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // ✅ search state
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    // ✅ Filter logic
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-[#1e293b] rounded-2xl h-[400px] animate-pulse border border-slate-800" />
            ))}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">Product Catalog</h1>

                {/* 🔍 Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-[#1e293b] border border-slate-700 text-white text-sm rounded-full pl-10 pr-4 py-2 outline-none w-64 focus:ring-2 focus:ring-blue-600"
                        placeholder="Search products..."
                    />
                </div>
            </div>

            {/* 🛍 Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group">
                            <div className="h-64 bg-white p-8 relative flex items-center justify-center overflow-hidden">
                                <img src={product.image} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={product.title} />
                                {product.price > 100 && (
                                    <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">HOT</span>
                                )}
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs text-slate-400">{product.rating.rate}</span>
                                </div>

                                <h3 className="text-white font-bold truncate">{product.title}</h3>
                                <p className="text-slate-500 text-xs mt-1 line-clamp-2 h-8">{product.description}</p>

                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-2xl font-black text-white">${product.price}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400 col-span-full text-center">
                        No products found.
                    </p>
                )}
            </div>
        </div>
    );
}
