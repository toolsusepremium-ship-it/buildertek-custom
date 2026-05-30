import { motion, AnimatePresence } from "motion/react"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IndustriesSectionMobile = ({ data }) => {
    const location = useLocation();
    const [active, setActive] = useState(0);

    const { industriesSection } = data;
    const navigator = useNavigate();
    const tab = industriesSection.tabs[active];


    return (
        <section className="sm:py-20  pb-0 bg-white">
            <div className="sm:w-[85%] mx-auto px-6">
                <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
                    <motion.h2
                        className="text-4xl md:text-[54px] font-normal mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {industriesSection.title}
                    </motion.h2>
                    <motion.p
                        className="text-xl text-[#637091]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {industriesSection.description}
                    </motion.p>
                </div>
                <motion.div
                    className="mb-10 sm:mb-12 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-wrap w-full justify-center mx-auto mb-8 sm:mb-0 gap-4 px-1 bg-[#F8F8F8] py-10 sm:py-1 rounded-xl">
                        {industriesSection.tabs.map((item, i) => (
                            <motion.button
                                key={i}
                                onClick={() => {
                                    setActive(i);
                                    document.getElementById("newData")?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });
                                }}
                                className={`${i === 0 || i === 2 ? "max-w-[200px]" : "max-w-[280px]"} text-base lg:text-xl font-medium whitespace-pre-wrap px-6 py-3 rounded-xl border border-[#1C1B1733] transition shrink-0 cursor-pointer
                ${active === i
                                        ? "bg-white shadow-md  text-[#020805]"
                                        : "bg-gray-50 font-normal text-[#757267]"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                    </div>
                    <motion.div
                        className="relative rounded-3xl p-0 overflow-hidden"
                        id="newData"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                    >
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className="md:p-10 flex flex-col gap-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Image on Top for Mobile */}
                               
                                {/* Content Below Image */}
                                <div className="flex flex-col text-center" >
                                    <motion.span
                                        className="text-blue-600 text-sm mx-auto font-semibold bg-blue-50 px-3 py-1 rounded-md w-fit"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {tab.tag}
                                    </motion.span>

                                    <motion.h3
                                        className="text-3xl lg:text-[44px] font-normal mt-4 mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {tab.title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-gray-600 mb-6 text-xl font-normal"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        {tab.subtitle}
                                    </motion.p>

                                    <hr className='border-[#0000001A] mb-4' />

                                    <motion.ul
                                        className="space-y-4 mb-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        {tab.points.map((p, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="flex items-center gap-3 text-base font-normal text-gray-700"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                                            >
                                                <div className="w-6 h-6 bg-white rounded-full shrink-0 flex items-center justify-center shadow-sm">
                                                    <span className="text-[#00D278] text-sm font-bold">✔</span>
                                                </div>
                                                {p}
                                            </motion.li>
                                        ))}
                                    </motion.ul>

                                  </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default IndustriesSectionMobile;