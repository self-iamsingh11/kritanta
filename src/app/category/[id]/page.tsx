"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Loader2, AlertCircle, Grid3X3 } from "lucide-react";

interface CollectionPreview {
    id: string;
    name: string;
    imageCount: number;
    previewImage?: string;
}

interface CategoryInfo {
    id: string;
    name: string;
    collectionCount: number;
}

interface CategoryPageProps {
    params: {
        id: string;
    };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { id } = params;
    const [category, setCategory] = useState<CategoryInfo | null>(null);
    const [collections, setCollections] = useState<CollectionPreview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategory() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`/api/categories/${id}`);
                const data = await response.json();

                if (data.success) {
                    setCategory(data.data.category);
                    setCollections(data.data.collections);
                } else {
                    setError(data.error || 'Category not found');
                }
            } catch (err) {
                console.error('Error fetching category:', err);
                setError('Failed to load category');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategory();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-ui-bg pt-[104px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
                        <p className="text-gray-500">Loading category...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !category) {
        return (
            <div className="min-h-screen bg-ui-bg pt-[104px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h1 className="text-2xl font-bold text-brand-charcoal mb-2">
                            Category Not Found
                        </h1>
                        <p className="text-gray-500 mb-6">{error || 'This category does not exist.'}</p>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-bold rounded-lg hover:brightness-90 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ui-bg pt-[104px]">
            {/* Header */}
            <div className="bg-brand-charcoal text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Categories
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-4">
                        {category.name}
                    </h1>
                    <p className="text-lg text-white/70">
                        {category.collectionCount} collections available
                    </p>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {collections.length === 0 ? (
                    <div className="text-center py-20">
                        <Grid3X3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No collections found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {collections.map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                            >
                                <Link
                                    href={`/category/${id}/${collection.id}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200 shadow-md hover:shadow-xl transition-all">
                                        {collection.previewImage ? (
                                            <Image
                                                src={collection.previewImage}
                                                alt={collection.name}
                                                fill
                                                className="object-cover transition-all duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                                <Grid3X3 className="w-12 h-12 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center gap-1 text-white text-sm bg-brand-red px-3 py-1 rounded-full w-fit">
                                                <Download className="w-4 h-4" />
                                                View All
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
                                            {collection.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {collection.imageCount} wallpapers
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
