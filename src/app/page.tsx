"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Download, Crown, Smartphone, Monitor, FolderOpen } from "lucide-react";
import { GodSection } from "@/lib/ftp";

// Types for dynamic categories
interface CategoryInfo {
    id: string;
    name: string;
    previewImage?: string;
    collectionCount: number;
}

interface CollectionPreview {
    id: string;
    name: string;
    images: string[];
}

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHeroHovered, setIsHeroHovered] = useState(false);

    // Categories state (dynamic from FTP root)
    const [categories, setCategories] = useState<CategoryInfo[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);

    // Legacy: God sections for backward compatibility
    const [godSections, setGodSections] = useState<GodSection[]>([]);
    const [isLoadingGods, setIsLoadingGods] = useState(true);
    const [godError, setGodError] = useState<string | null>(null);

    // Fetch dynamic categories from FTP root
    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoadingCategories(true);
                const response = await fetch('/api/categories');
                const data = await response.json();

                if (data.success) {
                    setCategories(data.data);
                } else {
                    setCategoriesError(data.message || 'Failed to load categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategoriesError('Failed to connect to server');
            } finally {
                setIsLoadingCategories(false);
            }
        }

        fetchCategories();
    }, []);

    // Fetch God sections for backward compatibility (featured section)
    useEffect(() => {
        async function fetchGodSections() {
            try {
                setIsLoadingGods(true);
                const response = await fetch('/api/gods');
                const data = await response.json();

                if (data.success) {
                    setGodSections(data.data);
                } else {
                    setGodError(data.message || 'Failed to load wallpaper collections');
                }
            } catch (error) {
                console.error('Error fetching wallpaper collections:', error);
                setGodError('Failed to connect to server');
            } finally {
                setIsLoadingGods(false);
            }
        }

        fetchGodSections();
    }, []);

    // Generate dynamic hero slides from fetched collections
    const heroSlides = godSections.slice(0, 3).map((section, index) => ({
        title: index === 0 ? "Divine Wallpapers" : index === 1 ? "Free Downloads" : "Premium Coming Soon",
        subtitle: index === 0
            ? "High-resolution artwork featuring Hindu gods for your desktop and mobile devices."
            : index === 1
                ? "Download stunning wallpapers instantly. No signup required for free content."
                : "Get exclusive access to premium collections, new releases, and unlimited downloads.",
        cta: index === 0 ? "Browse Collection" : index === 1 ? "Start Downloading" : "Join Waitlist",
        href: index === 2 ? "/premium" : "#collections",
        image: section.images[0] || "",
        collectionName: section.name,
    }));

    // Auto-advance hero carousel
    useEffect(() => {
        if (isHeroHovered || heroSlides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHeroHovered, heroSlides.length]);

    const nextSlide = () => {
        if (heroSlides.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        if (heroSlides.length === 0) return;
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    // Show loading state for hero if no data yet
    const showHeroLoading = isLoadingGods;
    const hasHeroContent = heroSlides.length > 0;

    return (
        <div className="pt-[104px]">
            {/* Hero Carousel */}
            <section
                className="relative h-[70vh] min-h-[500px] overflow-hidden bg-brand-charcoal"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
            >
                {showHeroLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 text-brand-red animate-spin mx-auto mb-4" />
                            <p className="text-white/70">Loading divine wallpapers...</p>
                        </div>
                    </div>
                ) : !hasHeroContent ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-white/70 text-xl mb-4">Welcome to Kritanta</p>
                            <p className="text-white/50">Divine Wallpapers Collection</p>
                            <Link
                                href="#categories"
                                className="inline-flex items-center gap-2 px-8 py-4 mt-6 bg-brand-red text-white font-bold uppercase tracking-wide hover:brightness-90 transition-all"
                            >
                                <Download className="w-5 h-5" />
                                Browse Categories
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={heroSlides[currentSlide]?.image || ""}
                                    alt={heroSlides[currentSlide]?.title || "Divine Wallpapers"}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Hero Content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                <motion.div
                                    key={`content-${currentSlide}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="max-w-xl"
                                >
                                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 uppercase tracking-tight">
                                        {heroSlides[currentSlide].title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/90 mb-8">
                                        {heroSlides[currentSlide].subtitle}
                                    </p>
                                    <Link
                                        href={heroSlides[currentSlide].href}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white font-bold uppercase tracking-wide hover:brightness-90 transition-all active:scale-[0.98]"
                                    >
                                        <Download className="w-5 h-5" />
                                        {heroSlides[currentSlide].cta}
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHeroHovered ? 1 : 0 }}
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHeroHovered ? 1 : 0 }}
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center transition-all"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </motion.button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {heroSlides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                        ? "bg-white scale-110"
                                        : "bg-white/50 hover:bg-white/80"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* Features Bar */}
            <section className="py-8 bg-brand-charcoal text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <Download className="w-8 h-8 text-brand-mustard" />
                            <span className="font-bold">Free Downloads</span>
                            <span className="text-sm text-gray-400">No signup needed</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Monitor className="w-8 h-8 text-brand-mustard" />
                            <span className="font-bold">4K Resolution</span>
                            <span className="text-sm text-gray-400">High quality images</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Smartphone className="w-8 h-8 text-brand-mustard" />
                            <span className="font-bold">All Devices</span>
                            <span className="text-sm text-gray-400">Desktop & Mobile</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Crown className="w-8 h-8 text-brand-mustard" />
                            <span className="font-bold">Premium Content</span>
                            <span className="text-sm text-gray-400">Exclusive artwork</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Categories Section */}
            <section id="categories" className="py-16 bg-white scroll-mt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal uppercase tracking-tight mb-4">
                            Browse Categories
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Explore our diverse collection of premium wallpapers across multiple categories
                        </p>
                    </div>

                    {isLoadingCategories ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
                            <p className="text-gray-500">Loading categories...</p>
                        </div>
                    ) : categoriesError ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <p className="text-red-500 mb-4">{categoriesError}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-brand-red text-white rounded-lg hover:brightness-90"
                            >
                                Retry
                            </button>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-20">
                            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No categories available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/category/${category.id}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all">
                                            {category.previewImage ? (
                                                <Image
                                                    src={category.previewImage}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover transition-all duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-charcoal to-brand-red">
                                                    <FolderOpen className="w-16 h-16 text-white/50" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {category.name}
                                                </h3>
                                                <p className="text-white/70 text-sm">
                                                    {category.collectionCount} collections
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured God Collections from FTP (backward compatibility) */}
            <section id="collections" className="scroll-mt-32">
                {isLoadingGods ? (
                    <div className="py-16 bg-ui-bg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center justify-center py-20">
                                <Loader2 className="w-12 h-12 text-brand-red animate-spin mb-4" />
                                <p className="text-gray-500">Loading divine collections...</p>
                            </div>
                        </div>
                    </div>
                ) : godError ? (
                    <div className="py-16 bg-ui-bg">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center justify-center py-20">
                                <p className="text-red-500 mb-4">{godError}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-2 bg-brand-red text-white rounded-lg hover:brightness-90"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    godSections.map((section, sectionIndex) => (
                        <section
                            key={section.id}
                            className={`py-16 ${sectionIndex % 2 === 0 ? 'bg-ui-bg' : 'bg-white'}`}
                        >
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal uppercase tracking-tight">
                                            {section.name}
                                        </h2>
                                        <p className="text-gray-500 mt-1">{section.images.length} wallpapers available</p>
                                    </div>
                                    <Link
                                        href={`/category/gods/${section.id}`}
                                        className="text-brand-red font-medium hover:underline"
                                    >
                                        View All →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {section.images.slice(0, 8).map((imageUrl, index) => {
                                        // Extract category and filename from URL for the link
                                        const urlParts = imageUrl.split('/');
                                        const filename = urlParts[urlParts.length - 1];
                                        const collection = urlParts[urlParts.length - 2];
                                        const category = urlParts[urlParts.length - 3] || 'Gods';
                                        const posterUrl = `/poster/${encodeURIComponent(category)}/${encodeURIComponent(collection)}/${encodeURIComponent(filename)}`;

                                        return (
                                            <motion.a
                                                key={index}
                                                href={posterUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 cursor-pointer block"
                                            >
                                                <Image
                                                    src={imageUrl}
                                                    alt={`${section.name} wallpaper ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-all duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                                    <div className="flex items-center gap-2 text-white font-medium text-sm">
                                                        <Download className="w-4 h-4" />
                                                        Click to download
                                                    </div>
                                                </div>
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    ))
                )}
            </section>

            {/* Premium Subscription CTA Section */}
            <section className="py-20 bg-brand-mustard relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-20 -left-20 w-96 h-96 border-[40px] border-brand-charcoal rounded-full" />
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 border-[40px] border-brand-charcoal rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1 bg-brand-red text-white text-sm font-bold uppercase rounded-full mb-4">
                                <Crown className="w-4 h-4" />
                                Coming Soon
                            </span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-charcoal uppercase tracking-tighter">
                                Premium Access
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-2 mb-8"
                        >
                            <p className="text-xl md:text-2xl font-bold text-brand-charcoal">
                                Unlimited Downloads • Exclusive Content • Early Access
                            </p>
                            <p className="text-lg text-brand-charcoal/80">
                                Be the first to know when Premium launches!
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/premium"
                                className="inline-block px-10 py-4 bg-brand-charcoal text-white font-bold uppercase tracking-wide hover:bg-brand-charcoal/90 transition-all active:scale-[0.98]"
                            >
                                Join the Waitlist
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
