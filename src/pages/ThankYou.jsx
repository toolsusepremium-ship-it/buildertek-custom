import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/reusable/PageTransition';
import IconCard from '../components/reusable/IconCard';
import contactData from '../data/Contact.json';

const ThankYou = () => {
    const { cards } = contactData;

    return (
        <PageTransition>
            {/* Thank You Hero */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

                    {/* Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-10 flex justify-center"
                    >
                        <img
                            src="/assets/contact/Thank%20You.png"
                            alt="Thank You"
                            className="w-[352px] sm:w-[448px] md:w-[512px] object-contain"
                        />
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight"
                    >
                        Thank you for your interest.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10"
                    >
                        We have received your information, and will be in touch with you.
                    </motion.p>

                    {/* Back link */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-[#1868f0] font-semibold hover:underline text-base"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <div className="bg-gradient-to-b from-[#F6F7F9] to-[#F6F7F9]">
                <div className="container-main">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, staggerChildren: 0.2 }}
                        viewport={{ once: true }}
                        className="grid relative card-padding grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="w-full z-10 h-full card-base card-padding border border-[#A0B5FA]"
                            >
                                <IconCard card={card} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ThankYou;
