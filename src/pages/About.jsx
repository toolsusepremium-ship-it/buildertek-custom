import React, { useEffect } from 'react'
import AboutHero from '../components/about/AboutHero'
import Data from "../data/About.json"
import { motion } from 'motion/react'

import CenteredCtaSection from '../components/reusable/CenteredCtaSection'
import ServiceFeature from '../components/services/ServiceFeature'

export const About = () => {
  useEffect(() => { document.title = 'About - BuilderTek'; }, [])
  return (
    <>
      <AboutHero data={Data} />
      <section className="pt-[14vw] sm:pt-[14vw] md:pt-[12vw] lg:pt-[10vw]">

<div className='block sm:hidden py-5 px-5'>
  <img src="/Rectangle 8877.png" className="rounded-2xl pt-10  sm:w-full w-[95%] h-[58vw] sm:h-[390px]" alt="" />


</div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='relative w-[90%] mx-auto rounded-2xl overflow-hidden mt-10 md:h-[450px] h-[100vh] mx-auto text-white text-center p-4 py-10'
        >
          <img src={Data.trustedLogos.image} className='absolute top-0 left-0 w-full h-full object-cover' alt="" />
          <div className='absolute top-0 left-0 w-full h-full ' style={{ background: "linear-gradient(180deg, rgba(1, 26, 56, 0.6) 0%, #011A38 88.46%)" }} />
          <div className=' w-[80%] h-[80%] flex flex-col  justify-between absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  '>
            <motion.h2
              className="text-4xl md:text-[54px] font-normal mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {Data.trustedLogos.title}
            </motion.h2>

            <motion.div
              className="text-gray-300 flex flex-col md:flex-row justify-center items-center text-lg mb-8  rounded-2xl px-6 py-8 w-full max-w-[280px] md:max-w-full mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full text-center pb-5 mb-5 border-b border-white/20 md:border-b-0 md:border-r md:pb-0 md:mb-0 md:px-10">
                <div className="text-4xl whitespace-pre md:text-6xl font-bold leading-none">
                  1,00,000 +
                </div>
                <div className="mt-2 text-sm md:text-base">Projects Delivered</div>
              </div>

              <div className="w-full text-center py-5 mb-5 border-b border-white/20 md:border-b-0 md:border-r md:mb-0 md:px-10">
                <div className="text-4xl whitespace-pre md:text-6xl font-bold leading-none">21+</div>
                <div className="mt-2 text-sm md:text-base">Years Dominance</div>
              </div>

              <div className="w-full text-center md:px-10">
                <div className="text-4xl whitespace-pre md:text-6xl font-bold leading-none">#1</div>
                <div className="mt-2 text-sm md:text-base">Salesforce ISV Partner</div>
              </div>
            </motion.div>

          </div>

        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} className='max-w-[600px] my-10 flex sm:px-0 px-3 flex-col gap-5 mx-auto'>
          <p className='text-center text-xl font-normal text-[#126DFB]'>Our Story</p>
          <h1 className='text-center text-4xl text-black md:text-[54px] font-normal mb-6'>
            {Data.platformSection.title}
          </h1>
          <p className='text-center text-xl font-normal'>
            {Data.platformSection.description}
          </p>
        </motion.div>

        {Data.platformSection.features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-[85%] mx-auto my-10 sm:my-20"
          >
            <div
              className={`
        grid lg:grid-cols-2 grid-cols-1 
        gap-10 sm:gap-16 items-center
      `}
            >
              {/* Image */}
              <div
                className={`
          ${index % 2 !== 0 ? "lg:order-2" : ""}
          w-full ${index == 1 ? "h-[50vh]" : index == 0 ? "h-[80vh]" : "h-[70vh]"}
        `}
              >
                <img
                  src={feature.image}
                  className="w-full h-full object-cover rounded-2xl bg-gray-200"
                  alt=""
                />
              </div>

              {/* Text */}
              <div
                className={`
          ${index % 2 !== 0 ? "lg:order-1" : ""}
          text-gray-600 leading-relaxed text-[15px]
        `}
              >
                <h2 className="txt">
                  {feature.title}
                </h2>
                <br />

                <p className="txt">{feature.description}</p>
                {/* <p className="txt">{feature.description2}</p> */}
              </div>
            </div>
          </motion.div>
        ))}
        <ServiceFeature data={Data.financialControl} />
        <ServiceFeature data={Data.financialControl2} reverse={true} />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className='flex justify-between md:flex-nowrap flex-wrap w-[90%] mx-auto sm:gap-[100px] items-center'
        >
          <div className='w-full card-padding'>
            {Data.Results.badge && <span className="inline-block mb-6 my-4 px-4 py-1.5 rounded-md text-sm font-medium
              bg-blue-50 text-blue-600">
              {Data.Results.badge}
            </span>}
            <motion.h2
              className="text-4xl md:text-[54px] font-normal mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {Data.Results.title}
            </motion.h2>
            <p className="txt text-[#425466] text-[20px]">{Data.Results.description}</p>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className='w-full'
          >

            <p className="txt2 px-3 sm:px-0">{Data.Results.sub}</p>
          </motion.div>



        </motion.div>

      </section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <CenteredCtaSection data={Data.bringStructure.section} />
      </motion.div>
    </>
  )
}
