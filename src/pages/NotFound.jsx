import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { useEffect, useRef } from "react"

const NotFound = () => {
    const particlesRef = useRef([])

    // Generate random particles once
    useEffect(() => {
        particlesRef.current = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            delay: Math.random() * 4,
            duration: Math.random() * 6 + 6,
        }))
    }, [])

    return (
        <section className="relative min-h-screen bg-[#F3F7FF] flex items-center justify-center overflow-hidden px-4">

            {/* Background gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #3785FF 0%, transparent 70%)" }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
                    style={{ background: "radial-gradient(circle, #1146F2 0%, transparent 70%)" }}
                />
            </div>

            {/* Floating dots */}
            {Array.from({ length: 18 }, (_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-blue-400 opacity-20 pointer-events-none"
                    style={{
                        left: `${(i * 5.5 + 3) % 100}%`,
                        top: `${(i * 7.3 + 5) % 100}%`,
                        width: `${(i % 4) * 3 + 4}px`,
                        height: `${(i % 4) * 3 + 4}px`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: (i % 5) + 5,
                        delay: (i % 6) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main card */}
            <motion.div
                className="relative z-10 text-center max-w-xl w-full"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* 404 giant number */}
                <div className="relative select-none mb-4">
                    <motion.div
                        className="text-[140px] sm:text-[180px] font-bold leading-none"
                        style={{
                            background: "linear-gradient(135deg, #3785FF 0%, #1146F2 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
                    >
                        404
                    </motion.div>

                    {/* Decorative ring behind number */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <div
                            className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border-2 border-blue-200 opacity-40"
                            style={{ boxShadow: "0 0 60px 10px rgba(55, 133, 255, 0.15)" }}
                        />
                    </motion.div>
                </div>

                {/* Badge */}
                <motion.div
                    className="inline-block mb-5 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600 border border-blue-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    Page Not Found
                </motion.div>

                {/* Heading */}
                <motion.h1
                    className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    Looks like you're off the blueprint
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="text-gray-500 text-base sm:text-lg mb-10 max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    The page you're looking for doesn't exist or has been moved. Let's get your project back on track.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.85 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-[#3785FF] to-[#1146F2] border border-[#1146F2] hover:opacity-90 hover:scale-105 transition-all duration-300 text-sm sm:text-base shadow-lg shadow-blue-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>

                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-blue-600 bg-white border border-blue-100 hover:border-blue-300 hover:scale-105 transition-all duration-300 text-sm sm:text-base shadow-sm"
                    >
                        Schedule a Demo
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Bottom brand mark */}
            <motion.p
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
            >
                © 2026 BuilderTek, LLC — All Rights Reserved
            </motion.p>
        </section>
    )
}

export default NotFound
