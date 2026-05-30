import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import TrustedSlider from "../home/TrustedSlider";

const AboutHero = ({ data }) => {
    const { hero } = data;

    return (
        <section className="relative w-full pt-20 sm:pt-28 pb-10 text-center overflow-visible">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
            />
            {/* Absoluet overlay div on image */}
            <div className="absolute inset-0  opacity-90" style={{"background": "linear-gradient(9.07deg, #126DFB -40.55%, #001A38 54.18%)"
}}></div>
            {/* <div className="absolute inset-0 bg-[#F4F4F4] opacity-90"></div> */}

            {/* Content */}
            <div className="relative z-10  w-[90%] mx-auto  px-4 sm:px-4" >

                {/* Option A: Use the new hero-title class */}
                <motion.h1
                    className="hero-title2 text-white"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{textAlign:"start",color:"white"}}
                >
                    {hero.title}
                 
                       </motion.h1>

                {/* Option B: Or continue with Tailwind overrides */}
                {/* <h1 className="text-3xl lg:text-4xl font-semibold text-[#032D60] leading-tight">
                    {hero.title}{" "}
                    <span className="text-[#126DFB]">{hero.highlight}</span>
                </h1> */}

                <motion.p
                    className="mt-4 sm:mt-6 text-base lg:text-lg text-white max-w-3xl "
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{textAlign:"start",color:"white"}}
              
                >
                    {hero.description}
                </motion.p>

        
            </div>

            {/* Foreground Image (Overlaps next section) */}
            <motion.div
                className="relative w-[90%] sm:flex hidden  h-[12vh] sm:h-[30vh] justify-between  mx-auto mt-12 sm:mt-16 md:mt-20   px-4 z-20   gap-3.5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
               <img src="/assets/about/hero1.png" className="rounded-2xl sm:w-full w-[95%] h-[50vw] sm:h-[390px]" alt="" />

            </motion.div>
        </section>

    );
};

export default AboutHero;
