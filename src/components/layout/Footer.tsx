"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CreditCard, Shield, Truck, Star } from "lucide-react";

const footerLinks = {
    quickLinks: [
        { label: "Search", href: "/search" },
        { label: "Contact Us", href: "/pages/contact" },
        { label: "Customer Reviews", href: "/pages/reviews" },
        { label: "Track Order", href: "/pages/track" },
    ],
    policies: [
        { label: "Refund Policy", href: "/policies/refund" },
        { label: "Privacy Policy", href: "/policies/privacy" },
        { label: "Terms of Service", href: "/policies/terms" },
        { label: "Shipping Policy", href: "/policies/shipping" },
    ],
};

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Newsletter signup logic would go here
        alert("Thanks for subscribing!");
        setEmail("");
    };

    return (
        <footer className="bg-brand-charcoal text-white">
            {/* Trust Badges */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Truck className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">Free Shipping</span>
                                <span className="text-sm text-gray-400">On prepaid orders</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Shield className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">Secure Checkout</span>
                                <span className="text-sm text-gray-400">100% safe payments</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <Star className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">Premium Quality</span>
                                <span className="text-sm text-gray-400">High-res prints</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-brand-mustard/20 rounded-full flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-brand-mustard" />
                            </div>
                            <div>
                                <span className="font-bold block">Easy Returns</span>
                                <span className="text-sm text-gray-400">7-day return policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-display text-2xl font-bold mb-4">KRITANTA</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            India&apos;s No. 1 custom poster selling site. We specialize in premium
                            quality wall art that transforms your space into a work of art.
                        </p>
                        <p className="text-gray-400 text-sm">
                            <strong className="text-white">100,000+</strong> Happy Customers
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-brand-mustard transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            Policies
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.policies.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-brand-mustard transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 uppercase tracking-wide">
                            Newsletter
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and exclusive deals.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-mustard"
                            />
                            <button
                                type="submit"
                                className="px-4 bg-brand-red hover:brightness-90 rounded-r-lg transition-all"
                                aria-label="Subscribe"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © 2024 Kritanta. All rights reserved.
                        </p>

                        {/* Payment Icons */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-400">We accept:</span>
                            <div className="flex items-center gap-3">
                                {/* Visa */}
                                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                                    <svg viewBox="0 0 48 32" className="w-8 h-5">
                                        <rect fill="#1a1f71" width="48" height="32" rx="4" />
                                        <text
                                            x="24"
                                            y="20"
                                            fill="white"
                                            fontSize="12"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            VISA
                                        </text>
                                    </svg>
                                </div>
                                {/* Mastercard */}
                                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                                    <svg viewBox="0 0 48 32" className="w-8 h-5">
                                        <rect fill="#f5f5f5" width="48" height="32" rx="4" />
                                        <circle cx="18" cy="16" r="8" fill="#eb001b" />
                                        <circle cx="30" cy="16" r="8" fill="#f79e1b" />
                                    </svg>
                                </div>
                                {/* UPI */}
                                <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                                    <svg viewBox="0 0 48 32" className="w-8 h-5">
                                        <rect fill="#5a5f6d" width="48" height="32" rx="4" />
                                        <text
                                            x="24"
                                            y="20"
                                            fill="white"
                                            fontSize="10"
                                            fontWeight="bold"
                                            textAnchor="middle"
                                        >
                                            UPI
                                        </text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
