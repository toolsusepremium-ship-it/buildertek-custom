import { motion } from "motion/react"

const ConnectedOperations = ({ data }) => {
    const section = data.connectedOperations;

    return (
        <section className="sm:py-24 sm:pt-5 bg-white">
            <div className="sm:w-[85%] mx-auto px-6">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h2
                        className="text-4xl md:text-[44px] lg:text-[54px] font-normal mb-4  mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {section.title}
                    </motion.h2>
                    <motion.p
                        className="text-xl font-normal text-[#637091]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {section.description}
                    </motion.p>
                </div>

                {/* First Row → 2 Boxes */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {section.items.slice(0, 2).map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-gradient-to-b from-[#F5F1ED] to-[#F7F7F8] rounded-2xl p-8 text-center overflow-hidden h-[400px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2 + 0.3,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            {/* Image */}
                            <motion.div
                                className="mb-6 flex justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                                viewport={{ once: true }}
                            >
                                <motion.img
                                    src={item.image}
                                    alt=""
                                    className="w-full max-w-[420px] mx-auto object-contain"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>

                            {/* Content Overlay */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full min-h-44 p-6 z-20 bg-gradient-to-t from-[#F7F7F8] to-[#F7F7F8]/50 text-black"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-xl lg:text-2xl font-normal mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-base font-normal opacity-100 text-[#6B7280] max-w-md mx-auto">
                                    {item.desc}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Second Row → 3 Boxes */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items.slice(2, 5).map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-gradient-to-b from-[#F5F1ED] via-[#F8F7F6] to-[#F7F7F8] rounded-2xl p-8 text-center overflow-hidden h-[400px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1 + 0.5,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            {/* Image */}
                            <motion.div
                                className="mb-6 flex justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                                viewport={{ once: true }}
                            >
                                <motion.img
                                    src={item.image}
                                    alt=""
                                    className="w-full max-w-[420px] mx-auto object-contain"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>

                            {/* Content Overlay */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full min-h-48 p-6 z-20 bg-gradient-to-t from-[#F7F7F8] via-[#F8F7F6] to-[#F7F7F8]/50 text-black"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-xl lg:text-2xl font-normal mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-base font-normal opacity-100 text-[#6B7280]">
                                    {item.desc}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ConnectedOperations;
