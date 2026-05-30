import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import TrustedSlider from "./TrustedSlider";

const HomeHero = ({ data }) => {
    const { hero } = data;
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <section className="relative w-full pt-10 sm:pt-28 pb-10 text-center overflow-visible">
            {/* Background Image */}

            {/* Absoluet overlay div on image */}
            <div className="absolute inset-0 opacity-90"
                style={{ background: "linear-gradient(9.07deg, #126DFB -40.55%, #001A38 54.18%)" }}
            ></div>
            {/* <div className="absolute inset-0 bg-[#F4F4F4] opacity-90"></div> */}

            {/* Content */}
            <div className="relative w-[95%] flex flex-col lg:flex-row justify-between items-center lg:items-stretch gap-10 lg:gap-2 z-10 text-start ms-auto ps-4 sm:ps-4">

                <div className="w-full lg:w-[50%]">
                    {/* Option A: Use the new hero-title class */}
                    <motion.h1
                        className="hero-title2 "
                        style={{ color: "white " }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}

                    >
                        {hero.title}{" "}
                        {hero.subtitle}
                        <span className="text-[#126DFB]">{hero.highlight}</span>
                    </motion.h1>

                    {/* Option B: Or continue with Tailwind overrides */}
                    {/* <h1 className="text-3xl lg:text-4xl font-semibold text-[#032D60] leading-tight">
                    {hero.title}{" "}
   List.png                 <span className="text-[#126DFB]">{hero.highlight}</span>
                </h1> */}

                    <motion.p
                        className="mt-4 sm:mt-6 text-base lg:text-lg text-white max-w-3xl "
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {hero.description}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        className="mt-4 sm:mt-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link
                            to={hero.cta.link}
                            className="inline-flex items-center justify-center text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-3 rounded-2xl font-bold  text-white bg-gradient-to-r from-[#3785FF] to-[#1146F2]   hover:opacity-90 hover:scale-105 transition-all duration-300"
                        >
                            {hero.cta.label} <img src={hero.cta.icon} className="ml-2 max-w-6" alt="" />
                        </Link>
                    </motion.div>
                    <motion.div
                        className="mt-4 sm:mt-5 flex  "
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000009wK46EAE" className="flex sm:flex-row  w-fit sm:gap-x-[10px] gap-x-[5px]  rounded-[5px] p-[1px] py-[2px] " target="_blank">
                        <img src={hero.image1} className= "w-[140px] sm:w-full  cursor-pointer" alt="" />
                        <img src={hero.image2} className="w-[140px] sm:w-full  cursor-pointer" alt="" />
                        </a>
                    </motion.div>
                </div>

                {/* Right side Images */}
                <div className={`relative w-full lg:w-[45%] flex items-center ${width>768 ? "justify-end" : "justify-start"}  mt-12 lg:mt-0`}>
                    <div className={`relative w-[90%] sm:w-[70%] lg:w-[85%] max-w-lg`}>
                        {/* Second Image (Base) */}
                       {width>768 ?
                            <>  <img src={hero.sideimage.image1} className={`w-full h-auto object-contain relative z-0 `} alt="" />

                                <img
                                    src={hero.sideimage.image2}
                                    className="absolute top-[10%] left-[-40%] w-[100%] h-auto object-contain z-10 drop-shadow-2xl"
                                    alt=""
                                />
                        </>:
                            <img src='/Frame 39268 (2).svg' className={`w-full h-auto -mt-10 object-contain relative z-0 `} alt="" />
                        }
                    </div>
                </div>
            </div>

            {/* Foreground Image (Overlaps next section) */}
            <motion.div
                className="relative mx-auto mt-12 sm:mt-16 md:mt-20 w-full sm:w-[85%]   sm:px-4 z-20 -mb-20 sm:-mb-28 md:-mb-36 lg:-mb-44"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <TrustedSlider data={data} />
            </motion.div>
        </section>

    );
};

export default HomeHero;
