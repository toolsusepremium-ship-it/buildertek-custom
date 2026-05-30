import React, { useEffect, useState } from 'react'
import servicesData from '../data/Contact.json'
import SolutionsHero from '../components/reusable/Hero'
import PageTransition from '../components/reusable/PageTransition';
import ContactForm from '../components/contact/ContactForm';
import IconCard from '../components/reusable/IconCard';
import { motion } from 'motion/react'
import Text from '../components/reusable/Text';

const Contact = () => {
    const { hero, cards, form } = servicesData
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
const [isTablet, setIsTablet] = useState(window.innerWidth < 1024)
                useEffect(() =>{
                    const handleResize = () => {
                        setIsMobile(window.innerWidth < 768)
                        setIsTablet(window.innerWidth < 1024)
                    }
                    window.addEventListener('resize', handleResize)
                    return () => {
                        window.removeEventListener('resize', handleResize)
                    }
                },[])
    const data = hero
    return (
        <PageTransition>
            <div className=''>
                <SolutionsHero hero={hero} showTheme={!isTablet} badge={false} />
       {isTablet   && 
      <div className="hero-content2 w-full bg-[#001A38] flex-col p-10 items-start justify-center" style={{width:"100% !important"}}>
     
  {
          hero.badge && <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            className=" bg-white shadow-xl  w-[80%] rounded-lg px-6 py-5 my-4"
          >
            <Text
              variant="body"
              color="primary"
              className="text-pre-line text-start"
            >
              {hero.badge}
            </Text>
          </motion.div>
        }

          {/* Top Badge */}
          {
            hero.topBadge && <span
              className="bg-[#126DFB80] text-white font-medium px-3 py-3 rounded mb-6"
            >
              {hero.topBadge}
            </span>
          }

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
                <section className="sm:py-24 py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">

                            {/* LEFT CONTENT */}
                            <div className={`max-w-xl`}>


                                {/* Title */}
                                <h2 className="text-3xl lg:text-[54px] font-normal leading-tight mb-6">
                                    {data.title}
                                </h2>

                                {/* Description */}
                                <p className="text-[22px] text-gray-600 text-pre-line mb-10" >
                                    {data.description}
                                </p>

                                {/* Bullet Points */}
                            </div>
                            <ContactForm data={form} />



                        </div>
                    </div>
                </section>
                <div className="bg-gradient-to-b from-[#F6F7F9] to-[#F6F7F9/40]">
<div className="container-main ">
                     

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, staggerChildren: 0.2 }}
                            viewport={{ once: true }}
                            className="grid relative   card-padding grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {cards.map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className='w-full z-10 h-full card-base card-padding   border border-[#A0B5FA]'
                                >
                                    <IconCard card={card} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
</div>

            </div>
        </PageTransition>
    );
};

export default Contact;