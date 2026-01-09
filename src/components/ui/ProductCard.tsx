"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/data";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Default to first size
        addToCart(product, product.sizes[0] || "A4");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-lg overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                    {/* Primary Image */}
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className={`object-cover transition-all duration-500 ${isHovered && product.imageHover ? "opacity-0" : "opacity-100"
                            } group-hover:scale-105`}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Secondary Image (Hover) */}
                    {product.imageHover && (
                        <Image
                            src={product.imageHover}
                            alt={`${product.title} - alternate view`}
                            fill
                            className={`object-cover transition-all duration-500 absolute inset-0 ${isHovered ? "opacity-100 scale-105" : "opacity-0"
                                }`}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {product.onSale && product.compareAtPrice && (
                            <span className="bg-brand-red text-white text-xs font-bold uppercase px-2 py-1 rounded">
                                Save {calculateDiscount(product.compareAtPrice, product.price)}%
                            </span>
                        )}
                        {product.soldOut && (
                            <span className="bg-brand-charcoal text-white text-xs font-bold uppercase px-2 py-1 rounded">
                                Sold Out
                            </span>
                        )}
                    </div>

                    {/* Quick Add Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        className="absolute bottom-3 left-3 right-3 z-10"
                    >
                        <button
                            onClick={handleQuickAdd}
                            disabled={product.soldOut}
                            className={`w-full py-2.5 text-sm font-bold uppercase tracking-wide rounded transition-all ${product.soldOut
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-brand-red text-white hover:brightness-90 active:scale-[0.98]"
                                }`}
                        >
                            {product.soldOut ? "Sold Out" : "Quick Add"}
                        </button>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Vendor */}
                    <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">
                        {product.vendor}
                    </p>

                    {/* Title */}
                    <h3 className="font-bold text-brand-charcoal line-clamp-2 mb-2 group-hover:text-brand-red transition-colors">
                        {product.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        {product.compareAtPrice && (
                            <span className="text-gray-400 line-through text-sm">
                                {formatPrice(product.compareAtPrice)}
                            </span>
                        )}
                        <span
                            className={`font-bold ${product.onSale ? "text-brand-red" : "text-brand-charcoal"
                                }`}
                        >
                            {formatPrice(product.price)}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
