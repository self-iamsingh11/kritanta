"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories, heroSlides, reviews } from "@/lib/data";

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHeroHovered, setIsHeroHovered] = useState(false);

    // Auto-advance hero carousel
    useEffect(() => {
        if (isHeroHovered) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHeroHovered]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    return (
        <div className="pt-[104px]">
            {/* Hero Carousel */}
            <section
                className="relative h-[70vh] min-h-[500px] overflow-hidden"
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
            >
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
                            src={heroSlides[currentSlide].image}
                            alt={heroSlides[currentSlide].title}
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
                                className="inline-block px-8 py-4 bg-brand-red text-white font-bold uppercase tracking-wide hover:brightness-90 transition-all active:scale-[0.98]"
                            >
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
            </section>

            {/* Shop by Collection */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal text-center mb-12 uppercase tracking-tight">
                        Shop by Collection
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={category.href}
                                className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
                            >
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex items-end justify-center p-4">
                                    <h3 className="text-white font-bold text-lg md:text-xl uppercase tracking-wide group-hover:scale-110 transition-transform">
                                        {category.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-16 bg-ui-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal uppercase tracking-tight">
                            Best Sellers
                        </h2>
                        <Link
                            href="/collections/bestsellers"
                            className="text-brand-red font-medium hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    {/* Horizontal Scroll */}
                    <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
                        <div className="flex gap-6" style={{ width: "max-content" }}>
                            {products.slice(0, 10).map((product) => (
                                <div key={product.id} className="w-64 flex-shrink-0">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Combo Offer Banner */}
            <section className="py-16 bg-brand-mustard relative overflow-hidden">
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
                            <span className="inline-block px-4 py-1 bg-brand-red text-white text-sm font-bold uppercase rounded-full mb-4">
                                Limited Time Offer
                            </span>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-charcoal uppercase tracking-tighter">
                                BUY 4 GET 3 FREE
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
                                + Buy 10 Get 20 FREE
                            </p>
                            <p className="text-lg text-brand-charcoal/80">
                                Mix & match any designs. Biggest savings ever!
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/collections/all"
                                className="inline-block px-10 py-4 bg-brand-charcoal text-white font-bold uppercase tracking-wide hover:bg-brand-charcoal/90 transition-all active:scale-[0.98]"
                            >
                                Shop All Posters
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Products Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal text-center mb-12 uppercase tracking-tight">
                        Featured Products
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-16 bg-ui-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal text-center mb-12 uppercase tracking-tight">
                        What Our Customers Say
                    </h2>

                    {/* Masonry Grid */}
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="break-inside-avoid mb-6 bg-white rounded-xl shadow-sm overflow-hidden"
                            >
                                {review.image && (
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={review.image}
                                            alt={`Review by ${review.name}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-3">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-brand-mustard text-brand-mustard"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 text-sm mb-3">{review.text}</p>

                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-brand-charcoal rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                {review.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{review.name}</p>
                                            <p className="text-xs text-gray-500">{review.handle}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-charcoal text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 uppercase tracking-tight">
                            Create Your Own Poster
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                            Upload your favorite image and we&apos;ll transform it into a stunning
                            high-quality poster. Perfect for personalized gifts or custom wall art.
                        </p>
                        <Link
                            href="/custom-poster"
                            className="inline-block px-10 py-4 bg-brand-red text-white font-bold uppercase tracking-wide hover:brightness-90 transition-all active:scale-[0.98]"
                        >
                            Start Customizing
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
