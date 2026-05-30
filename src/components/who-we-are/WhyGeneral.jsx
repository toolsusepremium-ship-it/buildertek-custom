import { motion } from "motion/react";

const WhyGeneral = ({ data }) => {
    const { content } = data;

    return (
        <section className="sm:py-24 py-10 pb-0 -mt-4  bg-gradient-to-b from-[#E7EFFF] to-[#FFFFFF]">
            <div className="sm:w-[85%] mx-auto px-8 sm:px-6">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-16">
                    <motion.h2
                        className="text-3xl md:text-[54px] font-normal mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {data.title}
                        <br />
                        {data.title2}
                    </motion.h2>

                    <motion.p
                        className="text-xl font-normal text-[#637091]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {data.description}
                    </motion.p>
                </div>

                {/* Bottom Content */}
                <motion.div
                    className="grid md:grid-cols-2 gap-y-10 gap-x-16 sm:gap-16  card-padding items-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >

                    {/* LEFT – Image */}
                    <div className="relative">
                        <img
                            src={content.image}
                            alt="BuilderTek Platform"
                            className="w-full rounded-xl shadow-lg"
                        />

                        {/* Salesforce Badge */}
                        {/* <img
                            src={content.badge}
                            alt="Salesforce"
                            className="absolute -top-6 right-10 w-28"
                        /> */}
                    </div>

                    {/* RIGHT – Text */}
                    <div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-8">
                            {content.headline}
                            <br />
                            {content.headline2}
                            <br />
                            {content.headline3}
                        </h3>

                        <ul className="space-y-6">
                            {content.points.map((point, index) => (
                                <li key={index} className="flex items-start justify-start gap-x-2 gap-y-4">
                                    {/* <span className="mt-1 text-blue-600 text-xl">✔</span> */}
                                    {/* Image instead of tick text */}
                                    <img src={content.tick} alt="tick" className="w-8 h-8 mt-1" />
                                    <p className="text-lg lg:text-xl text-[#5A6582] font-normal leading-relaxed">
                                        {point}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default WhyGeneral;



















// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";

// const WhyGeneral = ({ data }) => {
//     const [active, setActive] = useState(0);
//     const tab = data.tabs[active];

//     return (
//         <section className="py-24 bg-white">
//             <div className="w-[85%] mx-auto px-6">

//                 {/* Heading */}
//                 <div className="text-center max-w-4xl mx-auto mb-14">
//                     <motion.h2
//                         className="text-4xl md:text-[54px] font-normal mb-6"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                     >
//                         {data.title}
//                     </motion.h2>

//                     <motion.p
//                         className="text-xl text-[#637091]"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                     >
//                         {data.description}
//                     </motion.p>
//                 </div>




//                 {/* Content */}
//                 <motion.div
//                     className="rounded-3xl bg-[#FAFAFA] border border-[#DCDBD6] shadow-md shadow-[#CFDDFC99] p-10"
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                 >
//                     <div className="grid md:grid-cols-2 gap-12 items-center">

//                         {/* Image Left */}
//                         <AnimatePresence mode="wait">
//                             <motion.img
//                                 key={active}
//                                 src={tab.image}
//                                 alt={tab.title}
//                                 className="w-[80%] mx-auto rounded-xl"
//                                 initial={{ opacity: 0, scale: 1.05 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.95 }}
//                             />
//                         </AnimatePresence>

//                         {/* Text Right */}
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={active}
//                                 initial={{ opacity: 0, x: 30 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -30 }}
//                             >
//                                 <h3 className="text-3xl lg:text-5xl font-bold text-nowrap leading-[1.2] mb-4">
//                                     {tab.title}
//                                     <br />
//                                     {tab.title2}
//                                 </h3>

//                                 <p className="text-lg md:text-2xl font-normal leading-normal text-black max-w-[500px]">
//                                     {tab.description}
//                                 </p>
//                             </motion.div>
//                         </AnimatePresence>

//                     </div>
//                 </motion.div>

//             </div>
//         </section>
//     );
// };

// export default WhyGeneral;
