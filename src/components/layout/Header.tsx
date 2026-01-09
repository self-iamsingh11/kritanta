"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    User,
    ShoppingBag,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/lib/data";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collections/all", label: "Shop Posters", hasMegaMenu: true },
    { href: "/collections/new", label: "New Arrivals" },
    { href: "/custom-poster", label: "Custom Poster" },
    { href: "/pages/about", label: "About" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const { cartCount, openCart } = useCart();

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
                        🚚 FREE SHIPPING on Prepaid Orders
                    </span>
                    <span className="mx-8 text-sm">
                        ⭐ BUY 4 GET 3 FREE - Limited Time Offer!
                    </span>
                    <span className="mx-8 text-sm">
                        🎨 Create Your Own Custom Poster
                    </span>
                    <span className="mx-8 text-sm">
                        🚚 FREE SHIPPING on Prepaid Orders
                    </span>
                    <span className="mx-8 text-sm">
                        ⭐ BUY 4 GET 3 FREE - Limited Time Offer!
                    </span>
                    <span className="mx-8 text-sm">
                        🎨 Create Your Own Custom Poster
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
                            {navLinks.map((link) =>
                                link.hasMegaMenu ? (
                                    <div
                                        key={link.href}
                                        className="relative"
                                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                                    >
                                        <button className="flex items-center gap-1 text-brand-charcoal hover:text-brand-red font-medium transition-colors py-4">
                                            {link.label}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Mega Menu */}
                                        <AnimatePresence>
                                            {isMegaMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-screen max-w-4xl"
                                                >
                                                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-6">
                                                        <div className="grid grid-cols-4 gap-6">
                                                            {/* Categories */}
                                                            <div>
                                                                <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wide mb-4">
                                                                    By Theme
                                                                </h3>
                                                                <ul className="space-y-3">
                                                                    {categories.map((cat) => (
                                                                        <li key={cat.id}>
                                                                            <Link
                                                                                href={cat.href}
                                                                                className="text-gray-600 hover:text-brand-red transition-colors"
                                                                            >
                                                                                {cat.title}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* Styles */}
                                                            <div>
                                                                <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wide mb-4">
                                                                    By Style
                                                                </h3>
                                                                <ul className="space-y-3">
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/realistic"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Realistic
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/spiritual"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Spiritual
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/abstract"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Abstract
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/anime"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Anime
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Format */}
                                                            <div>
                                                                <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wide mb-4">
                                                                    By Format
                                                                </h3>
                                                                <ul className="space-y-3">
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/single"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Single Poster
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/split"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Split Panel
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link
                                                                            href="/collections/combo"
                                                                            className="text-gray-600 hover:text-brand-red transition-colors"
                                                                        >
                                                                            Combo Pack
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Featured */}
                                                            <div className="bg-ui-bg rounded-lg p-4">
                                                                <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wide mb-4">
                                                                    Featured
                                                                </h3>
                                                                <Link
                                                                    href="/collections/bestsellers"
                                                                    className="block group"
                                                                >
                                                                    <div className="aspect-[3/4] bg-gradient-to-br from-brand-red to-brand-mustard rounded-lg mb-2 flex items-center justify-center">
                                                                        <span className="text-white font-bold text-lg">
                                                                            BESTSELLERS
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-brand-red font-medium group-hover:underline">
                                                                        Shop Bestsellers →
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-brand-charcoal hover:text-brand-red font-medium transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center space-x-4">
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block"
                                aria-label="Account"
                            >
                                <User className="w-5 h-5" />
                            </button>
                            <button
                                onClick={openCart}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                                aria-label="Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
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
                                        <span className="font-medium">{link.label}</span>
                                        <ChevronRight className="w-5 h-5" />
                                    </Link>
                                ))}
                            </nav>

                            <div className="p-4 mt-4">
                                <h3 className="font-bold text-brand-charcoal uppercase tracking-wide mb-4">
                                    Categories
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={cat.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-center p-3 bg-ui-bg rounded-lg hover:bg-brand-mustard/20 transition-colors"
                                        >
                                            <span className="text-sm font-medium">{cat.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
