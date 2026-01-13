"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Check, Bell, Sparkles, Download, Lock } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Download,
        title: "Unlimited Downloads",
        description: "Download as many high-resolution posters as you want"
    },
    {
        icon: Sparkles,
        title: "Exclusive Content",
        description: "Access to premium artwork not available for free users"
    },
    {
        icon: Lock,
        title: "Early Access",
        description: "Get new releases before anyone else"
    },
    {
        icon: Crown,
        title: "No Watermarks",
        description: "All downloads are watermark-free and print-ready"
    },
];

export default function PremiumPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-charcoal pt-[104px]">
            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-brand-mustard rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-red rounded-full blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-mustard/20 text-brand-mustard rounded-full text-sm font-bold uppercase mb-6">
                            <Crown className="w-4 h-4" />
                            Coming Soon
                        </span>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight">
                            Premium <br />
                            <span className="text-brand-mustard">Subscription</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
                            Unlock unlimited access to our entire collection of divine artwork.
                            High-resolution downloads, exclusive content, and early access to new releases.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                            >
                                <feature.icon className="w-10 h-10 text-brand-mustard mb-4" />
                                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Waitlist Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-white text-2xl font-bold mb-2">You&apos;re on the list!</h3>
                                <p className="text-gray-300">
                                    We&apos;ll notify you as soon as Premium launches.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-6">
                                    <Bell className="w-10 h-10 text-brand-mustard mx-auto mb-4" />
                                    <h3 className="text-white text-2xl font-bold mb-2">Join the Waitlist</h3>
                                    <p className="text-gray-300">
                                        Be the first to know when Premium launches
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-brand-mustard transition-colors"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-6 py-3 bg-brand-red text-white font-bold uppercase tracking-wide rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? "Joining..." : "Notify Me"}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Back to Gallery Link */}
            <div className="py-12 text-center">
                <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    ← Back to Gallery
                </Link>
            </div>
        </div>
    );
}
