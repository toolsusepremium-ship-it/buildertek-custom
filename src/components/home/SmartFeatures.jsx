import { motion } from "motion/react"

const SmartFeatures = ({ data }) => {
    const { title, description, features } = data.featuresSection;

    return (
        <section className="bg-[#F3F7FF] sm:py-20 py-10  mt-10 sm:pt-5 overflow-hidden">
            <div className="w-[90%] max-w-7xl mx-auto px-4  sm:px-6">
                {/* 
                   Custom Grid: Column 1 (Bidding) is wide, Column 2 (Scheduling) is narrow, Column 3 (Right stack) is wide.
                   This ensures "every card width is different" as requested.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr_1.1fr] gap-8 items-start">

                    {/* Column 1 & 2 Container (Span for Header) */}
                    <div className="lg:col-span-2 flex flex-col text-center sm:text-start  gap-10 sm:gap-20">
                        {/* Heading & Description */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <motion.h2
                                className="text-4xl lg:text-[54px] font-normal text-gray-900 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                {title.split("\n").map((line, i) => (
                                    <span key={i} className="block">
                                        {line}
                                    </span>
                                ))}
                            </motion.h2>

                            <motion.p
                                className="mt-8 sm:mt-6 text-gray-600 text-lg max-w-xl"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {description}
                            </motion.p>
                        </motion.div>

                        {/* Bottom Row of Column 1 and 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8">
                            {/* Bidding Card: Wide */}
                            <FeatureCard feature={features[1]} index={1} className="min-h-[400px]" />
                            {/* Scheduling Card: Narrow */}
                            <FeatureCard feature={features[2]} index={2} className="min-h-[420px]" />
                        </div>
                    </div>

                    {/* Right Column (Column 3) Stack */}
                    <div className="flex flex-col  gap-8 h-full">
                        {/* Mobile Tools Card: Tall and specific width */}
                        <FeatureCard feature={features[0]} index={0} className="min-h-[380px] sm:ml-auto w-full sm:w-[300px]" />

                        {/* Budgeting Card: Shorter but wider container */}
                        <FeatureCard feature={features[3]} index={3} className="min-h-[280px] " />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ feature, index, className = "" }) => {
    return (
        <motion.div
            className={`bg-white rounded-2xl shadow-md p-8 flex flex-col ${className} h-full transition-all duration-300`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        >
            <motion.div className="flex-grow flex items-center justify-center">
                <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto max-h-[380px] sm:max-h-[280px] object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                />
            </motion.div>

            <div className="mt-auto">
                <h3 className="text-2xl font-normal text-black leading-tight">
                    {feature.title}
                </h3>

                {/* {feature.cta && (
                    <div className="mt-4">
                        <button className="px-5 py-2 rounded-lg bg-[#D9FF00] text-black font-semibold text-sm hover:brightness-95 transition-all">
                            {feature.cta}
                        </button>
                    </div>
                )} */}
            </div>
        </motion.div>
    );
};

export default SmartFeatures;
