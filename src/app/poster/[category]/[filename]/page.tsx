"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, ArrowLeft, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PosterViewProps {
    params: {
        category: string;
        filename: string;
    };
}

export default function PosterViewPage({ params }: PosterViewProps) {
    const { category, filename } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const decodedCategory = decodeURIComponent(category);
    const decodedFilename = decodeURIComponent(filename);
    const imageUrl = `/api/image/${category}/${filename}`;

    // Extract a readable name from filename
    const posterName = decodedFilename
        .replace(/_/g, ' ')
        .replace(/\.[^/.]+$/, '') // Remove extension
        .replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, '') // Remove UUIDs
        .replace(/_\d+$/, '') // Remove trailing numbers
        .trim()
        .slice(0, 60) + (decodedFilename.length > 60 ? '...' : '');

    const handleDownload = async () => {
        try {
            setIsDownloading(true);

            // Fetch the image
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = decodedFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            setError('Failed to download image');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-charcoal pt-[104px]">
            {/* Top Bar */}
            <div className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-[104px] z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Back to Gallery</span>
                        </Link>

                        <div className="flex-1 mx-4 text-center">
                            <h1 className="text-white font-medium truncate max-w-xl mx-auto">
                                {decodedCategory} Wallpapers
                            </h1>
                        </div>

                        <motion.button
                            onClick={handleDownload}
                            disabled={isDownloading || isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-bold uppercase tracking-wide rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="hidden sm:inline">Downloading...</span>
                                </>
                            ) : (
                                <>
                                    <Download className="w-5 h-5" />
                                    <span className="hidden sm:inline">Download Wallpaper</span>
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Image Container */}
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4 sm:p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative max-w-5xl w-full"
                >
                    {error ? (
                        <div className="flex flex-col items-center justify-center py-20 text-white">
                            <X className="w-16 h-16 text-red-500 mb-4" />
                            <p className="text-lg mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-brand-red text-white rounded-lg hover:brightness-90"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl">
                                    <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
                                </div>
                            )}
                            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900">
                                <Image
                                    src={imageUrl}
                                    alt={posterName}
                                    width={1200}
                                    height={1600}
                                    className="w-full h-auto object-contain max-h-[80vh]"
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => {
                                        setIsLoading(false);
                                        setError('Failed to load image');
                                    }}
                                    priority
                                />
                            </div>

                            {/* Image Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 text-center"
                            >
                                <p className="text-white/60 text-sm mb-2">
                                    {decodedCategory} • High Resolution PNG
                                </p>
                                <p className="text-white/40 text-xs">
                                    Click the download button to save the full-size wallpaper
                                </p>
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
