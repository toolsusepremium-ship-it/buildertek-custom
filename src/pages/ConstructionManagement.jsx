import React, { useEffect, useState } from 'react'
import ConstructionManagementData from '../data/ConstructionManagement.json'
import SolutionsHero from '../components/reusable/Hero'
import PageTransition from '../components/reusable/PageTransition';
import TwoColumnHeader from '../components/reusable/TwoColumnHeader';
import { motion } from 'motion/react'
import SimpleHeader from '../components/reusable/SimpleHeader';
import IconCard from '../components/reusable/IconCard';
import ServiceFeature from '../components/services/ServiceFeature';
import { Build } from '../components/services/Build';
import { FinancialCom } from '../components/services/Financial';
import CenteredCtaSection from '../components/reusable/CenteredCtaSection';
import FaqSection from '../components/reusable/FaqSection';
import Text from '../components/reusable/Text';


const ConstructionManagement = () => {
    const { hero, whyChoose, sharperFinancial, financialControl, build, Financial, bringStructure } = ConstructionManagementData
    const { section } = whyChoose
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    useEffect(() => { document.title = 'Construction Management - BuilderTek'; }, [])
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
        <PageTransition>
            <div className=''>
                <SolutionsHero hero={hero} showTheme={!isMobile} hmax={true} badge={false} />
                {isMobile &&
                    <div className="hero-content2 w-full bg-[#001A38] flex-col p-10 items-start justify-center" style={{ width: "100% !important" }}>



                        {/* Top Badge */}
                        {hero.topBadge ? (
                            <span
                                className="inline-block bg-[#126DFB80] text-white text-sm font-medium px-3 py-1.5 rounded mb-6"
                            >
                                {hero.topBadge}
                            </span>
                        ) : null}

                        {/* Title */}
                        <Text
                            variant="h1"
                            color="primary-dark"
                            animated
                            delay={0.7}
                            className="text-pre-line text-white"
                            style={{ lineHeight: '1.1', marginTop: '1rem' }}
                        >
                            {hero.title}

                        </Text>

                        <Text
                            variant="body-lg"
                            color="muted"
                            animated
                            delay={0.9}
                            className="mt-6 lg:max-w-[600px] text-white"
                        >
                            {hero.description}
                        </Text>




                    </div>

                }
                <ServiceFeature data={financialControl} />

                {/* Financial Tools Component */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className=""
                >
                    <div className="sm:w-[85%] card-padding  mx-auto mt-0  sm:mt-14 md:mt-20">
                        <TwoColumnHeader
                            title={section.title}
                            subtitle={section.subtitle}
                        />

                        <div className="pb-6 sm:pb-16  bg-white ">
                            <div className="">

                                <div className="grid grid-cols-1 card-padding md:grid-cols-2 lg:grid-cols-3 gap-x-16  gap-y-10 sm:gap-y-20">

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

                {/* Sharper Financial Component */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-bg-white "
                >
                    <div className="container-main">
                        <SimpleHeader
                            title={sharperFinancial.section.title}
                            description={sharperFinancial.section.description}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, staggerChildren: 0.2 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-1 card-padding relative  md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {sharperFinancial.cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className='w-full h-full z-10 card-base card-padding   border border-[#A0B5FA]'
                                >
                                    <IconCard card={card} />
                                </motion.div>
                            ))}
                            <div className='absolute bluesh'></div>



                        </motion.div>
                    </div>
                </motion.section>
                <Build data={build} />
                <FinancialCom data={Financial} />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <CenteredCtaSection data={bringStructure.section} />
                    {
                        ConstructionManagementData.faq && <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <FaqSection data={ConstructionManagementData.faq} />
                        </motion.div>
                    }
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default ConstructionManagement;