"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Menu,
    X,
    ChevronRight,
    Download,
} from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/premium", label: "Premium", badge: "Coming Soon" },
    { href: "/pages/about", label: "About" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""
                }`}
        >
            {/* Announcement Bar */}
            <div className="bg-brand-charcoal text-white h-10 flex items-center overflow-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    <span className="mx-8 text-sm">
                        🖼️ FREE Divine Wallpapers - Download Now!
                    </span>
                    <span className="mx-8 text-sm">
                        ⭐ 4K+ High Resolution Downloads Available
                    </span>
                    <span className="mx-8 text-sm">
                        👑 Premium Subscription Coming Soon!
                    </span>
                    <span className="mx-8 text-sm">
                        🖼️ FREE Divine Wallpapers - Download Now!
                    </span>
                    <span className="mx-8 text-sm">
                        ⭐ 4K+ High Resolution Downloads Available
                    </span>
                    <span className="mx-8 text-sm">
                        👑 Premium Subscription Coming Soon!
                    </span>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <span className="font-display text-2xl font-bold text-brand-charcoal tracking-tight">
                                KRITANTA
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-brand-charcoal hover:text-brand-red font-medium transition-colors flex items-center gap-2"
                                >
                                    {link.label}
                                    {link.badge && (
                                        <span className="text-[10px] px-2 py-0.5 bg-brand-mustard text-brand-charcoal rounded-full font-bold uppercase">
                                            {link.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center space-x-4">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <Link
                                href="/premium"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:brightness-90 transition-all"
                            >
                                <Download className="w-4 h-4" />
                                Get Premium
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-xl overflow-y-auto"
                        >
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <span className="font-display text-xl font-bold text-brand-charcoal">
                                    KRITANTA
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="p-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between py-3 border-b border-gray-100 text-brand-charcoal hover:text-brand-red"
                                    >
                                        <span className="font-medium flex items-center gap-2">
                                            {link.label}
                                            {link.badge && (
                                                <span className="text-[10px] px-2 py-0.5 bg-brand-mustard text-brand-charcoal rounded-full font-bold uppercase">
                                                    {link.badge}
                                                </span>
                                            )}
                                        </span>
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                ))}
                            </nav>

                            <div className="p-4">
                                <Link
                                    href="/premium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-brand-red text-white font-bold rounded-lg hover:brightness-90 transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Get Premium
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
