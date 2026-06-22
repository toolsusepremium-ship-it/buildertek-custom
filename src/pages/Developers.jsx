import React, { useEffect, useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import whoWeServe from '../data/Developer.json'

import SolutionsHero from '../components/reusable/Hero'
import { motion } from 'motion/react'
import CenteredCtaSection from '../components/reusable/CenteredCtaSection'
import FaqSection from '../components/reusable/FaqSection'
import SimplifyConstruction from '../components/who-we-are/SimplifyConstruction'
import TwoColumnHeader from '../components/reusable/TwoColumnHeader'
import WhyGeneral from '../components/who-we-are/WhyGeneral'
import Mobilesimplify from '../components/who-we-are/Mobilesimplify'


const Developer = () => {

    const { whyChoose } = whoWeServe
    const { section } = whyChoose
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    useSEO({
        title: 'Construction Software for Developers & Owners | BuilderTek',
        description: 'Gain portfolio-wide visibility into budgets, schedules, approvals, and project performance with BuilderTek.',
        keywords: 'construction software for developers, owner project management software, developer construction platform, portfolio management',
    })
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <div>
            <SolutionsHero hero={whoWeServe.hero} bgImage={isMobile} h={isMobile} badge={false} person={true} />

            {!isMobile ? <SimplifyConstruction data={whoWeServe.simplifyConstruction} /> : <Mobilesimplify data={whoWeServe.simplifyConstruction} />}

            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className=""
            >
                <div className="w-[85%]  card-padding mx-auto">
                    <TwoColumnHeader
                        title={section.title}
                        subtitle={section.subtitle}
                    />

                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, staggerChildren: 0.2 }}
                        viewport={{ once: true }}
                        className="grid-2"
                    >
                        {whyChoose.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <GridCard feature={feature} />
                            </motion.div>
                        ))}
                    </motion.div> */}
                    <div className="pb-6 sm:pb-16  bg-white ">
                        <div className="">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10 sm:gap-y-20">

                                {whyChoose.features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="max-w-sm"
                                    >
                                        {/* Icon */}
                                        <div className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center">
                                            <img
                                                src={feature.icon}
                                                alt={feature.title}
                                                className="w-full h-full"
                                            />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl lg:text-2xl font-medium text-black  mbmb-3">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[#425466] text-base lg:text-xl font-normal leading-[26px]">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
            </motion.section>

            <WhyGeneral data={whoWeServe.whyGeneral} />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <CenteredCtaSection data={whoWeServe.bringStructure.section} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <FaqSection data={whoWeServe.faq} />
            </motion.div>
        </div>
    )
}

export default Developer