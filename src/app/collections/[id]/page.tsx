"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Loader2, AlertCircle } from "lucide-react";

interface CollectionData {
    id: string;
    name: string;
    images: string[];
    count: number;
}

interface CollectionPageProps {
    params: {
        id: string;
    };
}

export default function CollectionPage({ params }: CollectionPageProps) {
    const { id } = params;
    const [collection, setCollection] = useState<CollectionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCollection() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`/api/collections/${id}`);
                const data = await response.json();

                if (data.success) {
                    setCollection(data.data);
                } else {
                    setError(data.error || 'Collection not found');
                }
            } catch (err) {
                console.error('Error fetching collection:', err);
                setError('Failed to load collection');
            } finally {
                setIsLoading(false);
            }
        }

        fetchCollection();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-ui-bg pt-[104px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
                        <p className="text-gray-500">Loading collection...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !collection) {
        return (
            <div className="min-h-screen bg-ui-bg pt-[104px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h1 className="text-2xl font-bold text-brand-charcoal mb-2">
                            Collection Not Found
                        </h1>
                        <p className="text-gray-500 mb-6">{error || 'This collection does not exist.'}</p>
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
                        Back to Collections
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight mb-4">
                        {collection.name}
                    </h1>
                    <p className="text-lg text-white/70">
                        {collection.count} wallpapers available for download
                    </p>
                </div>
            </div>

            {/* Wallpaper Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {collection.images.map((imageUrl, index) => {
                        // Extract category and filename from URL for the link
                        const urlParts = imageUrl.split('/');
                        const filename = urlParts[urlParts.length - 1];
                        const category = urlParts[urlParts.length - 2];
                        const wallpaperUrl = `/poster/${encodeURIComponent(category)}/${encodeURIComponent(filename)}`;

                        return (
                            <motion.a
                                key={index}
                                href={wallpaperUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200 cursor-pointer block shadow-md hover:shadow-xl transition-shadow"
                            >
                                <Image
                                    src={imageUrl}
                                    alt={`${collection.name} wallpaper ${index + 1}`}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white text-sm font-medium">
                                            Wallpaper #{index + 1}
                                        </span>
                                        <div className="flex items-center gap-1 text-white text-sm bg-brand-red px-3 py-1 rounded-full">
                                            <Download className="w-4 h-4" />
                                            Download
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Load More / Info */}
                {collection.images.length > 0 && (
                    <div className="text-center mt-12">
                        <p className="text-gray-500">
                            Showing all {collection.count} wallpapers • Click any image to view and download
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
