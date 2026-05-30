import { motion } from 'motion/react'
// import solutionData from '../data/solutions-one.json'
import SolutionsHero from '../components/reusable/Hero'
import CenteredTitle from '../components/reusable/CenteredTitle'
import ImageTextCard from '../components/reusable/ImageTextCard'
import TwoColumnHeader from '../components/reusable/TwoColumnHeader'
import GridCard from '../components/reusable/GridCard'
import SimpleHeader from '../components/reusable/SimpleHeader'
import IconCard from '../components/reusable/IconCard'
import CenteredCtaSection from '../components/reusable/CenteredCtaSection'
import FaqSection from '../components/reusable/FaqSection'
import PageTransition from '../components/reusable/PageTransition'

const RequestForQuote = ({ solutionData }) => {
    const { hero, sectionTitle, features, whyChoose, makeSmarter, bringStructure, faq } = solutionData
    const { section } = whyChoose

    return (
        <PageTransition>
            <SolutionsHero hero={hero} badge={hero.badge} />
            <div className=''>
                {/* w-[85%] mx-auto */}

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-bg-white w-[85%] mx-auto"
                >
                    <div className="sub-container">
                        <CenteredTitle
                            title={sectionTitle.title}
                            description={sectionTitle.description}
                        />

                        {features.map((feature, index) => (
                            <ImageTextCard key={index} feature={feature} index={index} />
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-bg-blue"
                >
                    <div className="w-[85%] mx-auto">
                        <TwoColumnHeader
                            title={section.title}
                            subtitle={section.subtitle}
                        />

                        <motion.div
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
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="section-bg-white "
                >
                    <div className="container-main">
                        <SimpleHeader
                            title={makeSmarter.section.title}
                            description={makeSmarter.section.description}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, staggerChildren: 0.2 }}
                            viewport={{ once: true }}
                            className="grid-3"
                        >
                            {makeSmarter.cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <IconCard card={card} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <CenteredCtaSection data={bringStructure.section} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <FaqSection data={faq} />
                </motion.div>
            </div>
        </PageTransition>
    )
}

export default RequestForQuote