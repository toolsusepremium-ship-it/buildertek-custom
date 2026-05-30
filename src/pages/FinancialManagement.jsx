import React from 'react'
import servicesData from '../data/services.json'
import SolutionsHero from '../components/reusable/Hero'
import PageTransition from '../components/reusable/PageTransition';
import TwoColumnHeader from '../components/reusable/TwoColumnHeader';
import { motion } from 'motion/react'
import SimpleHeader from '../components/reusable/SimpleHeader';
import IconCard from '../components/reusable/IconCard';
import ServiceFeature from '../components/services/ServiceFeature';
import { Build } from '../components/services/Build';
import { FinancialCom } from '../components/services/Financial';

import FaqSection from '../components/reusable/FaqSection'

const Services = () => {
    const { hero, whyChoose, sharperFinancial, financialControl, build, Financial } = servicesData
    const { section } = whyChoose
    return (
        <PageTransition>
            <div className=''>
                <SolutionsHero hero={hero} badge={false} />

                <ServiceFeature data={financialControl} />

                {/* Financial Tools Component */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className=""
                >
                    <div className="w-[85%] mx-auto mt-14 md:mt-20">
                        <TwoColumnHeader
                            title={section.title}
                            subtitle={section.subtitle}
                        />

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
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {sharperFinancial.cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className='w-full h-full card-base card-padding   border border-[#A0B5FA]'
                                >
                                    <IconCard card={card} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>
                <Build data={build} />
                <FinancialCom data={Financial} />
                {
                    servicesData.faq && <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <FaqSection data={servicesData.faq} />
                    </motion.div>
                }
            </div>
        </PageTransition>
    );
};

export default Services;