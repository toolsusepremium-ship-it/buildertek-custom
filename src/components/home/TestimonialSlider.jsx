import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
// Removed swiper/css/pagination since we use custom pagination

const TestimonialSlider = ({ data }) => {
    const { title, items, quoteImage } = data.testimonials;

    // Swiper 11+ requires at least slidesPerView * 2 slides for loop mode.
    // Duplicate the items to ensure there are enough slides for smooth looping.
    const sliderItems = [...items, ...items, ...items, ...items];
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-[#F3F7FF] sm:py-20 py-10 pt-5 relative overflow-hidden">
            <div className="max-w-full mx-auto px-4 text-center relative">

                {/* Title */}
                <h2 className="text-4xl lg:text-[54px] font-normal text-black mb-14">
                    {title}
                </h2>

                {/* Slider */}
                <Swiper
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    modules={[Autoplay, Navigation]}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    spaceBetween={40}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
               
                    watchSlidesProgress={true}
                    className="!overflow-visible"
                >
                    {sliderItems.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className="!w-[360px] md:!w-[760px] lg:!w-[800px]"
                        >
                            {({ isActive }) => (
                                <div
                                    className={`transition-all duration-500 ${isActive
                                        ? "opacity-100 scale-100"
                                        : "opacity-40 scale-95"
                                        }`}
                                >
                                    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] px-6 md:px-10 py-10 text-center">

                                        {/* Quote Icon */}
                                        <div className="flex justify-center mb-8">
                                            <img
                                                src={quoteImage}
                                                alt="Quote"
                                                className="w-14 h-14 md:w-20 md:h-20 opacity-40"
                                            />
                                        </div>

                                        {/* Quote */}
                                        <p className="text-lg md:text-2xl lg:text-[28px] text-gray-900 leading-relaxed mb-10">
                                            “{item.quote}”
                                        </p>

                                        {/* Author */}
                                        <h4 className="text-base md:text-lg text-gray-900">
                                            {item.name}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons (VISIBLE + CLICKABLE) */}
              

                {/* Custom Pagination */}
                <div className="flex justify-center mt-10 gap-3 relative z-10">
                    {items.map((_, index) => {
                        const isActive = activeIndex % items.length === index;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    if (swiperInstance) {
                                        swiperInstance.slideToLoop(index);
                                    }
                                }}
                                className={`h-2 rounded-full transition-all cursor-pointer ${isActive ? "bg-blue-600 w-8" : "bg-gray-300 w-2"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSlider;









// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const TestimonialSlider = ({ data }) => {
//     const { title, items, quoteImage } = data.testimonials;

//     return (
//         <section className="bg-[#F3F7FF] py-20 overflow-hidden">
//             <div className="max-w-full mx-auto px-4 text-center">

//                 {/* Title */}
//                 <h2 className="text-4xl lg:text-[54px] font-normal text-black mb-14">
//                     {title}
//                 </h2>

//                 {/* Slider */}
//                 <Swiper
//                     modules={[Autoplay, Navigation, Pagination]}
//                     loop={true}
//                     centeredSlides={true}
//                     slidesPerView="auto"
//                     spaceBetween={40}
//                     autoplay={{
//                         delay: 4000,
//                         disableOnInteraction: false,
//                     }}
//                     navigation={{
//                         prevEl: ".testimonial-prev",
//                         nextEl: ".testimonial-next",
//                     }}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     className="!overflow-visible"
//                 >
//                     {items.map((item, index) => (
//                         <SwiperSlide
//                             key={index}
//                             className="!w-[360px] md:!w-[760px] lg:!w-[800px]"
//                         >
//                             {({ isActive }) => (
//                                 <div
//                                     className={`transition-all duration-500 ${isActive
//                                         ? "opacity-100 scale-100"
//                                         : "opacity-40 scale-95"
//                                         }`}
//                                 >
//                                     <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] px-6 md:px-10 py-10 text-center">

//                                         {/* Quote Icon */}
//                                         <div className="flex justify-center mb-8">
//                                             <img
//                                                 src={quoteImage}
//                                                 alt="Quote"
//                                                 className="w-14 h-14 md:w-20 md:h-20 opacity-40"
//                                             />
//                                         </div>

//                                         {/* Quote */}
//                                         <p className="text-lg md:text-2xl lg:text-[28px] text-gray-900 leading-relaxed mb-10">
//                                             “{item.quote}”
//                                         </p>

//                                         {/* Author */}
//                                         <h4 className="text-base md:text-lg text-gray-900">
//                                             {item.name}
//                                         </h4>
//                                         <p className="text-sm text-gray-500 mt-1">
//                                             {item.role}
//                                         </p>
//                                     </div>
//                                 </div>
//                             )}
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>

//                 {/* Controls */}
//                 <button className="testimonial-prev hidden md:flex absolute left-10 top-1/2 -translate-y-1/2
//           bg-blue-600 text-white text-3xl shadow-md rounded-full
//           w-11 h-11 items-center justify-center">
//                     ‹
//                 </button>

//                 <button className="testimonial-next hidden md:flex absolute right-10 top-1/2 -translate-y-1/2
//           bg-blue-600 text-white text-3xl shadow-md rounded-full
//           w-11 h-11 items-center justify-center">
//                     ›
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default TestimonialSlider;













// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion } from "motion/react";

// const TestimonialSlider = ({ data }) => {
//     const { title, items, quoteImage } = data.testimonials;

//     const sliderRef = useRef(null);

//     // layout constants
//     const CARD_WIDTH = 760;
//     const GAP = 40;

//     // clone items for infinite loop
//     const loopedItems = useMemo(() => {
//         return [...items, ...items, ...items];
//     }, [items]);

//     // start from middle set
//     const BASE_INDEX = items.length;
//     const [current, setCurrent] = useState(BASE_INDEX);
//     const [isResetting, setIsResetting] = useState(false);

//     // autoplay
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => prev + 1);
//         }, 4000);

//         return () => clearInterval(timer);
//     }, []);

//     // silent reset (NO visual jump)
//     useEffect(() => {
//         const total = items.length;

//         if (current >= total * 2) {
//             setIsResetting(true);
//             requestAnimationFrame(() => {
//                 setCurrent(total);
//                 setIsResetting(false);
//             });
//         }

//         if (current < total) {
//             setIsResetting(true);
//             requestAnimationFrame(() => {
//                 setCurrent(total * 2 - 1);
//                 setIsResetting(false);
//             });
//         }
//     }, [current, items.length]);

//     // controls
//     const prevSlide = () => setCurrent((prev) => prev - 1);
//     const nextSlide = () => setCurrent((prev) => prev + 1);

//     // active index for styling & dots
//     const activeIndex = current % items.length;

//     // track transform (stable, no drift)
//     const trackStyle = {
//         transform: `translateX(-${current * (CARD_WIDTH + GAP)}px)`,
//     };

//     return (
//         <section className="bg-[#F3F7FF] py-20 overflow-hidden">
//             <div className="max-w-full mx-auto px-4 text-center">

//                 {/* Title */}
//                 <motion.h2
//                     className="text-4xl lg:text-[54px] font-normal text-black mb-14"
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                 >
//                     {title}
//                 </motion.h2>

//                 {/* Slider */}
//                 <div ref={sliderRef} className="relative overflow-hidden">

//                     {/* CENTERING WRAPPER */}
//                     <div className="flex justify-center">
//                         <div
//                             className={`flex gap-10 ${isResetting
//                                     ? "transition-none"
//                                     : "transition-transform duration-500 ease-in-out"
//                                 }`}
//                             style={{
//                                 paddingLeft: `calc(50% - ${CARD_WIDTH / 2}px)`,
//                                 paddingRight: `calc(50% - ${CARD_WIDTH / 2}px)`,
//                                 ...trackStyle,
//                             }}
//                         >
//                             {loopedItems.map((item, index) => {
//                                 const isActive = index % items.length === activeIndex;

//                                 return (
//                                     <div
//                                         key={`${item.id}-${index}`}
//                                         className={`shrink-0 md:w-[760px] lg:w-[800px] transition-all duration-500 ${isActive
//                                                 ? "opacity-100 scale-100 z-10"
//                                                 : "opacity-40 scale-95"
//                                             }`}
//                                     >
//                                         <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] px-10 py-12 text-center">

//                                             {/* Quote Icon */}
//                                             <div className="flex justify-center mb-8">
//                                                 <img
//                                                     src={quoteImage}
//                                                     alt="Quote"
//                                                     className="w-20 h-20 opacity-40"
//                                                 />
//                                             </div>

//                                             {/* Quote */}
//                                             <p className="text-2xl lg:text-[28px] text-gray-900 leading-relaxed mb-10">
//                                                 “{item.quote}”
//                                             </p>

//                                             {/* Author */}
//                                             <h4 className="text-lg text-gray-900">
//                                                 {item.name}
//                                             </h4>
//                                             <p className="text-sm text-gray-500 mt-1">
//                                                 {item.role}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Controls */}
//                     <button
//                         onClick={prevSlide}
//                         className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2
//               bg-blue-600 text-white text-3xl shadow-md rounded-full
//               w-11 h-11 items-center justify-center"
//                     >
//                         ‹
//                     </button>

//                     <button
//                         onClick={nextSlide}
//                         className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2
//               bg-blue-600 text-white text-3xl shadow-md rounded-full
//               w-11 h-11 items-center justify-center"
//                     >
//                         ›
//                     </button>
//                 </div>

//                 {/* Dots */}
//                 <div className="flex justify-center mt-10 gap-3">
//                     {items.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrent(BASE_INDEX + index)}
//                             className={`h-2 rounded-full transition-all ${activeIndex === index
//                                     ? "bg-blue-600 w-8"
//                                     : "bg-gray-300 w-2"
//                                 }`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TestimonialSlider;












// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion } from "motion/react";

// const TestimonialSlider = ({ data }) => {
//     const { title, items, quoteImage } = data.testimonials;

//     const sliderRef = useRef(null);
//     const [containerWidth, setContainerWidth] = useState(0);

//     // layout constants
//     const CARD_WIDTH = 760;
//     const GAP = 40;

//     // create looped items
//     const LOOP_MULTIPLIER = 3;
//     const loopedItems = useMemo(() => {
//         return Array.from({ length: LOOP_MULTIPLIER }, () => items).flat();
//     }, [items]);

//     // start from middle copy
//     const [current, setCurrent] = useState(items.length);
//     const [isResetting, setIsResetting] = useState(false);

//     // track container width
//     useEffect(() => {
//         const el = sliderRef.current;
//         if (!el) return;

//         const update = () => setContainerWidth(el.clientWidth || 0);
//         update();

//         const ro = new ResizeObserver(update);
//         ro.observe(el);

//         return () => ro.disconnect();
//     }, []);

//     const isMobile = containerWidth > 0 && containerWidth < 768;

//     // autoplay (continuous)
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => prev + 1);
//         }, 4000);

//         return () => clearInterval(timer);
//     }, []);

//     // silent reset logic (key part)
//     useEffect(() => {
//         const total = items.length;

//         if (current >= total * 2) {
//             setIsResetting(true);
//             setTimeout(() => {
//                 setCurrent(total);
//                 setIsResetting(false);
//             }, 0);
//         }

//         if (current <= total - 1) {
//             setIsResetting(true);
//             setTimeout(() => {
//                 setCurrent(total * 2 - 1);
//                 setIsResetting(false);
//             }, 0);
//         }
//     }, [current, items.length]);

//     // controls
//     const prevSlide = () => setCurrent((prev) => prev - 1);
//     const nextSlide = () => setCurrent((prev) => prev + 1);

//     // track transform
//     const trackStyle = useMemo(() => {
//         if (isMobile) {
//             return { transform: `translateX(-${current * 100}%)` };
//         }

//         return {
//             transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px - ${current * (CARD_WIDTH + GAP)
//                 }px))`,
//         };
//     }, [current, isMobile]);

//     return (
//         <section className="bg-[#F3F7FF] py-20 relative overflow-hidden">
//             <div className="max-w-full mx-auto px-4 text-center">

//                 {/* Title */}
//                 <motion.h2
//                     className="text-4xl lg:text-[54px] font-normal text-black mb-14"
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                 >
//                     {title}
//                 </motion.h2>

//                 {/* Slider */}
//                 <div ref={sliderRef} className="relative overflow-hidden">

//                     <div className={`flex ${isMobile ? "justify-start" : "justify-center"}`}>
//                         <div
//                             className={`flex ${isResetting
//                                     ? "transition-none"
//                                     : "transition-transform duration-500 ease-in-out"
//                                 } ${isMobile ? "gap-0" : "gap-10"}`}
//                             style={trackStyle}
//                         >
//                             {loopedItems.map((item, index) => (
//                                 <div
//                                     key={`${item.id}-${index}`}
//                                     className={`shrink-0 w-full ${isMobile ? "" : "md:w-[760px] lg:w-[800px]"
//                                         } transition-all duration-500 ${index === current
//                                             ? "opacity-100 scale-100 z-10"
//                                             : "opacity-40 scale-95"
//                                         }`}
//                                 >
//                                     <div
//                                         className={`bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]
//                     px-6 md:px-10 py-10 text-center ${isMobile ? "mx-2 w-[360px]" : ""
//                                             }`}
//                                     >
//                                         {/* Quote Icon */}
//                                         <div className="flex justify-center mb-8">
//                                             <img
//                                                 src={quoteImage}
//                                                 alt="Quote"
//                                                 className="w-14 h-14 md:w-20 md:h-20 opacity-40"
//                                             />
//                                         </div>

//                                         {/* Quote */}
//                                         <p className="text-lg md:text-2xl lg:text-[28px] text-gray-900 leading-relaxed mb-10">
//                                             “{item.quote}”
//                                         </p>

//                                         {/* Author */}
//                                         <h4 className="text-base md:text-lg text-gray-900">
//                                             {item.name}
//                                         </h4>
//                                         <p className="text-sm text-gray-500 mt-1">
//                                             {item.role}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Controls */}
//                     <button
//                         onClick={prevSlide}
//                         className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2
//             bg-blue-600 text-white text-3xl shadow-md rounded-full
//             w-11 h-11 items-center justify-center"
//                     >
//                         ‹
//                     </button>

//                     <button
//                         onClick={nextSlide}
//                         className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2
//             bg-blue-600 text-white text-3xl shadow-md rounded-full
//             w-11 h-11 items-center justify-center"
//                     >
//                         ›
//                     </button>
//                 </div>

//                 {/* Dots (based on original items) */}
//                 <div className="flex justify-center mt-10 gap-3">
//                     {items.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrent(items.length + index)}
//                             className={`h-2 rounded-full transition-all ${current % items.length === index
//                                     ? "bg-blue-600 w-8"
//                                     : "bg-gray-300 w-2"
//                                 }`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TestimonialSlider;
















// import { useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";

// const TestimonialSlider = ({ data }) => {
//     const { title, items, quoteImage } = data.testimonials;
//     const [current, setCurrent] = useState(0);
//     const sliderRef = useRef(null)
//     const [containerWidth, setContainerWidth] = useState(0)

//     // Layout constants
//     const CARD_WIDTH = 760;
//     const GAP = 40;

//     // Track container width for responsive behavior
//     useEffect(() => {
//         const el = sliderRef.current
//         if (!el) return

//         const update = () => setContainerWidth(el.clientWidth || 0)
//         update()

//         if (typeof ResizeObserver !== "undefined") {
//             const ro = new ResizeObserver(() => update())
//             ro.observe(el)
//             return () => ro.disconnect()
//         }

//         window.addEventListener("resize", update)
//         return () => window.removeEventListener("resize", update)
//     }, [])

//     const isMobile = containerWidth > 0 && containerWidth < 768

//     // Auto Slide
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % items.length);
//         }, 4000);

//         return () => clearInterval(timer);
//     }, [items.length]);

//     // Keep current index valid if items change
//     useEffect(() => {
//         if (current > items.length - 1) setCurrent(0)
//     }, [current, items.length])

//     const prevSlide = () => {
//         setCurrent((prev) => (prev - 1 + items.length) % items.length);
//     };

//     const nextSlide = () => {
//         setCurrent((prev) => (prev + 1) % items.length);
//     };

//     const trackStyle = useMemo(() => {
//         if (isMobile) {
//             return { transform: `translateX(-${current * 100}%)` }
//         }
//         return {
//             transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px - ${current * (CARD_WIDTH + GAP)}px))`,
//         }
//     }, [CARD_WIDTH, GAP, current, isMobile])

//     return (
//         <section className="bg-[#F3F7FF] py-20 relative overflow-hidden">
//             <div className="max-w-full mx-auto px-4 text-center">

//                 {/* Title */}
//                 <motion.h2
//                     className="text-4xl lg:text-[54px] font-normal text-black mb-14"
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     viewport={{ once: true }}
//                 >
//                     {title}
//                 </motion.h2>

//                 {/* Slider */}
//                 <div ref={sliderRef} className="relative overflow-hidden">

//                     <div className={`flex ${isMobile ? "justify-start" : "justify-center"}`}>
//                         <div
//                             className={`${isMobile ? "gap-0" : "gap-10"} flex transition-transform duration-500 ease-in-out`}
//                             style={trackStyle}
//                         >
//                             {items.map((item, index) => (
//                                 <div
//                                     key={item.id}
//                                     className={`shrink-0 w-full ${isMobile ? "" : "md:w-[760px] lg:w-[800px]"} transition-all duration-500 ${index === current
//                                         ? "opacity-100 scale-100 z-10"
//                                         : "opacity-40 scale-95"
//                                         }`}
//                                 >
//                                     <div className={`bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] px-6 md:px-10 py-10 md:py-10 text-center ${isMobile ? "mx-2 w-[360px]" : ""}`}>

//                                         {/* Quote Icon */}
//                                         <div className="flex justify-center mb-6 md:mb-8">
//                                             <img
//                                                 src={quoteImage}
//                                                 alt="Quote"
//                                                 className="w-14 h-14 md:w-20 md:h-20 opacity-40"
//                                             />
//                                         </div>

//                                         {/* Quote */}
//                                         <p className="text-lg md:text-2xl lg:text-[28px] text-gray-900 font-normal leading-relaxed mb-8 md:mb-10">
//                                             “{item.quote}”
//                                         </p>

//                                         {/* Author */}
//                                         <h4 className="font-normal text-gray-900 text-base md:text-lg">
//                                             {item.name}
//                                         </h4>
//                                         <p className="text-sm font-normal text-gray-500 mt-1">
//                                             {item.role}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Controls */}
//                     <button
//                         onClick={prevSlide}
//                         className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-3xl shadow-md rounded-full w-11 h-11 items-center justify-center cursor-pointer"
//                     >
//                         ‹
//                     </button>

//                     <button
//                         onClick={nextSlide}
//                         className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-3xl shadow-md rounded-full w-11 h-11 items-center justify-center cursor-pointer"
//                     >
//                         ›
//                     </button>
//                 </div>

//                 {/* Dots */}
//                 <div className="flex justify-center mt-10 gap-3">
//                     {items.map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrent(index)}
//                             className={`h-2 rounded-full transition-all ${current === index
//                                 ? "bg-blue-600 w-8"
//                                 : "bg-gray-300 w-2"
//                                 }`}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TestimonialSlider;



