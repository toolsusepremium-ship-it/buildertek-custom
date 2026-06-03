import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import PageTransition from '../components/reusable/PageTransition';
import FreeDemoForm from '../components/contact/FreeDemoForm';
import IconCard from '../components/reusable/IconCard';
import contactData from '../data/Contact.json';

const FreeDemo = () => {
    const { cards } = contactData;

    useEffect(() => {
        let tag = document.querySelector('meta[name="robots"][data-freedemo]');
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', 'robots');
            tag.setAttribute('data-freedemo', '1');
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', 'noindex, nofollow');
        return () => tag.remove();
    }, []);

    return (
        <PageTransition>
            {/* Compact hero — 40% shorter than standard (709px → 425px) */}
            <section className="relative w-full h-[240px] sm:h-[300px] lg:h-[425px] overflow-hidden">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    src="/assets/contact/Free%20Demo.png"
                    alt="Schedule A Demo With Us"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(269.31deg, rgba(0, 26, 56, 0) 40%, rgba(0, 26, 56, 0.514775) 55%, rgba(0, 26, 56, 0.86595) 75%, rgba(0, 26, 56, 0.93682) 85%, #001A38 100%)" }}
                />
                <div className="relative z-10 h-full flex items-center px-6 md:px-20">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-[60px] font-bold leading-tight"
                    >
                        Schedule A Demo<br />With Us
                    </motion.h1>
                </div>
            </section>

            {/* Main content: left text + right form */}
            <section className="py-10 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">

                        {/* Left */}
                        <div className="max-w-xl">
                            <h2 className="text-3xl lg:text-[54px] font-normal leading-tight mb-6">
                                See BuilderTek<br />In Action
                            </h2>
                            <p className="text-lg md:text-[22px] text-gray-600 leading-relaxed">
                                A focused walkthrough of BuilderTek — we'll go deep on the modules that will work best for your team. No commitment.
                            </p>
                        </div>

                        {/* Right: form */}
                        <FreeDemoForm />
                    </div>
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

export default FreeDemo;
