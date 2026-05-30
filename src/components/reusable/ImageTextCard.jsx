import { motion } from 'motion/react'
import Text from './Text'

const ImageTextCard = ({ feature, index = 0 }) => {
    const isImageRight = feature.imagePosition === "right"

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="card-feature"
        >
            <div
                className={`grid lg:grid-cols-2 sm:gap-10 gap-5 items-center ${isImageRight ? "" : "lg:flex-row-reverse"
                    }`}
            >
                {/* Text */}
                <motion.div
                    className='max-w-[422px]'
                    initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                >
                 {feature.tag &&   <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                        className="tag-primary wrap-balance "
                    >
                        {feature.tag}
                    </motion.div>}

                    <Text
                        variant="h3"
                        animated
                        delay={index * 0.1 + 0.4}
                        className="mt-3 lg:text-[40px] w-[85%] text-[#0a2540] font-semibold"
                    >
                        {feature.title}
                    </Text>

                    <Text
                        variant="body-base"
                        color="secondary"
                        animated
                        delay={index * 0.1 + 0.5}
                        className="mt-4"
                    >
                        {feature.description}
                    </Text>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className={`${isImageRight ? "" : "lg:order-first"}`}
                >
                    <img
                        src={feature.image}
                        alt={feature.title}
                        className="img-rounded"
                    />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ImageTextCard