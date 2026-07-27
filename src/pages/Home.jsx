import { lazy, Suspense } from 'react'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { useSEO } from '../hooks/useSEO'
import homeData from '../data/home.json'
import HomeHero from '../components/home/HomeHero'
import PlatformSection from '../components/home/PlatformSection'
import { motion } from 'motion/react'

// Everything below the fold loads as its own chunk, so the landing route ships
// only the hero + first section on the critical path.
const IndustriesSection = lazy(() => import('../components/home/IndustriesSection'))
const IndustriesSectionMobile = lazy(() => import('../components/home/IndustriesSectionMobile'))
const ConnectedOperations = lazy(() => import('../components/home/ConnectedOperations'))
const SmartFeatures = lazy(() => import('../components/home/SmartFeatures'))
const TestimonialSlider = lazy(() => import('../components/home/TestimonialSlider'))
const CenteredCtaSection = lazy(() => import('../components/reusable/CenteredCtaSection'))

const Home = () => {
  const { bringStructure } = homeData;
  const isDesktop = useIsDesktop()
  useSEO({
    title: 'BuilderTek Construction Management Software',
    description: 'BuilderTek is a Salesforce ISV partner construction management software designed to manage RFQs, budgets, scheduling, CRM, financials, and project workflows in one platform.',
    keywords: 'construction management software, Salesforce construction software, construction project management platform, contractor software',
  })
  return (
    <div>
      <HomeHero data={homeData} />
      <section className="pt-[16vw] sm:pt-[14vw] md:pt-[12vw] lg:pt-[10vw]">

        <PlatformSection data={homeData} />
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          {isDesktop ? <IndustriesSection data={homeData} /> : <IndustriesSectionMobile data={homeData} />}
          <ConnectedOperations data={homeData} />
          <SmartFeatures data={homeData} />
          <TestimonialSlider data={homeData} />
        </Suspense>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <CenteredCtaSection data={bringStructure.section} />
        </Suspense>
      </motion.div>

    </div>
  )
}

export default Home
