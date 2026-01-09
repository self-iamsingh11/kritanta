"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
    const {
        items,
        isOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        discount,
        total,
        cartCount,
        offerUnlocked,
        itemsNeededForOffer,
        freeItemsCount,
    } = useCart();

    // Progress bar calculation
    const progressPercent = Math.min((cartCount / 4) * 100, 100);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="font-bold text-lg">Your Cart</span>
                                <span className="bg-brand-charcoal text-white text-xs px-2 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                                aria-label="Close cart"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Gamification Progress Bar */}
                        <div className="p-4 bg-ui-bg border-b border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Gift
                                    className={`w-5 h-5 ${offerUnlocked ? "text-green-600" : "text-brand-mustard"
                                        }`}
                                />
                                <span className="text-sm font-medium">
                                    {offerUnlocked
                                        ? `🎉 Offer Unlocked! ${freeItemsCount} items FREE!`
                                        : `Add ${itemsNeededForOffer} more for FREE items!`}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercent}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`h-full rounded-full ${offerUnlocked ? "bg-green-500" : "bg-brand-mustard"
                                        }`}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Buy 4 Get 3 FREE • Buy 10 Get 20 FREE
                            </p>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                                    <h3 className="font-bold text-lg mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Add some amazing posters to get started!
                                    </p>
                                    <button
                                        onClick={closeCart}
                                        className="px-6 py-2 bg-brand-red text-white font-bold uppercase tracking-wide rounded hover:brightness-90 transition-all"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {items.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex gap-4 bg-ui-bg rounded-lg p-3"
                                        >
                                            {/* Image */}
                                            <div className="relative w-20 h-28 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                                    {item.product.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mb-2">
                                                    Size: {item.size}
                                                </p>
                                                <p className="font-bold text-brand-red">
                                                    {formatPrice(item.product.price)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className="flex items-center border border-gray-300 rounded">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.id, item.quantity - 1)
                                                            }
                                                            disabled={item.quantity <= 1}
                                                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="px-3 text-sm font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.id, item.quantity + 1)
                                                            }
                                                            className="p-1 hover:bg-gray-100"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1 text-gray-400 hover:text-brand-red transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-100 p-4">
                                {/* Breakdown */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Discount ({freeItemsCount} free items)</span>
                                            <span>-{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button className="w-full py-4 bg-brand-charcoal text-white font-bold uppercase tracking-wide rounded-lg hover:bg-brand-charcoal/90 transition-all active:scale-[0.99]">
                                    Checkout • {formatPrice(total)}
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Shipping & taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
