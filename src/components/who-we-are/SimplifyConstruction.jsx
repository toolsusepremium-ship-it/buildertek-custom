import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SimplifyConstruction = ({ data }) => {
    const [active, setActive] = useState(0);
    const tab = data.tabs[active];

    return (
        <section className="py-24  bg-white">
            <div className="sm:w-[85%]  mx-auto px-6">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-14">
                    <motion.h2
                        className="text-4xl md:text-[54px] font-normal mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {data.title}
                    </motion.h2>

                    <motion.p
                        className="text-xl text-[#637091]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {data.description}
                    </motion.p>
                </div>

                {/* Tabs */}
                {/* <div className="mb-12 overflow-x-auto no-scrollbar">
                    <div className="flex w-max mx-auto gap-3 bg-[#F8F8F8] p-1 rounded-xl">
                        {data.tabs.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`px-6 py-3 rounded-xl border text-sm whitespace-nowrap transition
                  ${active === i
                                        ? "bg-white shadow font-semibold text-black"
                                        : "bg-transparent text-gray-600"
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div> */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-wrap justify-center w-full mx-auto gap-4 px-1 py-1 rounded-xl">
                        {data.tabs.map((item, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`max-w-[250px] text-xl font-medium whitespace-pre-wrap px-6 py-3 rounded-xl border border-[#1C1B1733] transition shrink-0 cursor-pointer
                ${active === i
                                        ? "bg-white shadow-md font-semibold text-[#020805]"
                                        : "bg-gray-50 text-[#757267]"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                                <span className="block">{item.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>


                {/* Content */}
                <motion.div
                    className="rounded-3xl  bg-[#FAFAFA] border border-[#DCDBD6] shadow-md shadow-[#CFDDFC99] p-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="grid  md:grid-cols-2 gap-12 items-center">

                        {/* Image Left */}
                        <AnimatePresence mode="wait">
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

                        {/* Text Right */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                {tab.tag && (
                                    <span className="inline-block text-xs font-semibold tracking-wider text-[#126DFB] uppercase bg-[#EDF3FF] px-3 py-1 rounded mb-4">
                                        {tab.tag}
                                    </span>
                                )}

                                <h3 className="text-3xl lg:text-5xl font-bold text-wrap leading-[1.2] mb-4">
                                    {tab.title}
                                    <br />
                                    {tab.title2}
                                </h3>

                                <p className="text-lg md:text-2xl font-normal leading-normal text-black max-w-[500px]">
                                    {tab.description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default SimplifyConstruction;
