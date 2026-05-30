import { motion, AnimatePresence } from "motion/react"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Mobilesimplify = ({ data }) => {
    const location = useLocation();
    const [active, setActive] = useState(0);

    const  industriesSection  = data
    const navigator=useNavigate();
    const tab = industriesSection.tabs[active];


    return (
        <section className="sm:py-20 py-10 pb-5 sm:pb-10 bg-white">
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
                    className="sm:mb-12 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-wrap w-full justify-center mx-auto gap-4 px-1 bg-[#F8F8F8] py-10 sm:py-1 rounded-xl">
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
                        className="relative rounded-3xl overflow-hidden"
                        id="newData"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                    >    <AnimatePresence mode="wait">
                            <motion.img
                                key={active}
                                src={tab.image}
                                alt={tab.title}
                                className="w-[80%] mx-auto rounded-xl"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            />
                        </AnimatePresence>
                          <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                className=""
                            >
                                <h3 className="text-3xl lg:text-5xl font-bold text-center sm:text-start sm:pt-10 text-wrap leading-[1.2] mb-4">
                                    {tab.title}
                                    <br />
                                    {tab.title2}
                                </h3>

                                <p className="text-lg md:text-2xl font-normal text-center sm:text-start  leading-normal text-black max-w-[500px]">
                                    {tab.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Mobilesimplify;