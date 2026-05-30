
import { motion } from "motion/react"
import { useState, useEffect } from "react";
const PlatformSection = ({ data }) => {
    const { platformSection } = data;
    const main = platformSection.mainFeature;
    const main2 = platformSection.mainFeature2;

    return (
        <section className={`sm:py-24 py-10 bg-white`}>
            <div className="sm:w-[85%] mx-auto px-6">

                {/* Top Heading */}
                <div className="grid md:grid-cols-2 gap-10 mb-10 sm:mb-16">
                    <motion.h2
                        className="text-4xl md:text-[50px] font-medium text-[#0a2540]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {platformSection.title}
                    </motion.h2>

                    <motion.p
                        className="text-lg text-[#637091]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {platformSection.description}
                    </motion.p>
                </div>

                {/* Main Feature Card */}
                <motion.div
                    className="relative overflow-hidden rounded-3xl bg-blue-100 p-10 sm:py-20 py-8"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                >

                    {/* Cloud Background */}
                    <img
                        src={main.cloudImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover bg-center opacity-70"
                    />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">

                        {/* Left Content */}
                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <img
                                    src={main.circleImage}
                                    alt=""
                                    className="h-5 w-auto"
                                />
                                <img
                                    src={main.tagImage}
                                    alt=""
                                    className="h-4 w-auto"
                                />
                            </div>

                            <h3 className="text-4xl lg:text-5xl font-normal leading-[1.1] mb-4 max-w-md">
                                {main.title}
                                <br />
                                {main.subtitle}
                            </h3>

                            <p className="text-[#1C1B17CC] text-lg max-w-xs">
                                {main.description}
                            </p>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src={main.image}
                                alt=""
                                className="w-full relative z-10"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Salesforce Badge */}
                            <motion.img
                                src={main.badgeImage}
                                alt=""
                                className="absolute -top-5 right-10 w-24 z-20"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Cards */}
                <div className="grid md:grid-cols-2 h-fit pt-10 space-y-10  sm:gap-10">
                    {platformSection.features.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-b md:h-full from-[#DAEFFE] to-[#F5F1ED] rounded-3xl pt-10 px-12 text-center overflow-hidden flex flex-col justify-between"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2 + 0.4,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            {/* Content */}
                            <div>
                                <h4 className="text-2xl  lg:text-3xl font-normal mb-3">
                                    {item.title}
                                </h4>

                                <p className="text-gray-600 text-base font-normal mb-8">
                                    {item.description}
                                </p>
                            </div>

                            {/* Image */}
                            <div className="w-full mt-6 h-fit md:h-[280px] flex items-end justify-center">
                                <motion.img
                                    src={item.image}
                                    alt=""
                                    className="max-w-full h-full object-contain object-bottom"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PlatformSection;
