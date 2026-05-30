
import { motion } from "motion/react"

const TrustedSlider = ({ data }) => {
    const { trustedLogos } = data;

    // duplicate for seamless loop
    const logos = [...trustedLogos.logos, ...trustedLogos.logos];

    return (
        <section className="sm:pt-10 pt-5 rounded-2xl bg-white">
            <div className="w-full mx-auto sm:px-6 text-center">
                <motion.h3
                    className="text-lg md:text-xl font-normal text-black mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                  Trusted by 

{" "}
                    <span className="font-semibold">construction leaders </span>{" "}
                    across  North America
                </motion.h3>

                {/* Slider */}
                <motion.div
                    className="relative overflow-hidden w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="flex w-max gap-16 pr-16 animate-[scroll_25s_linear_infinite]">
                        {logos.map((logo, index) => (
                            <motion.img
                                key={index}
                                src={logo}
                                alt="brand"
                                className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Animation defined inside component */}
            <style>
                {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
            </style>
        </section>
    );
};

export default TrustedSlider;
