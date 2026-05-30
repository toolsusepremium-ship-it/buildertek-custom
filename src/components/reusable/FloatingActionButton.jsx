import { motion } from 'motion/react'
import { useState } from 'react'

const FloatingActionButton = ({ 
  icon, 
  onClick, 
  position = "bottom-right",
  color = "blue",
  size = "md",
  tooltip,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const positions = {
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "top-right": "fixed top-6 right-6",
    "top-left": "fixed top-6 left-6"
  }

  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white"
  }

  const sizes = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16"
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  const buttonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 15,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`${positions[position]} z-50`}>
      {/* Pulse effect */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className={`absolute inset-0 ${colors[color].split(' ')[0]} rounded-full`}
      />
      
      {/* Main button */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          ${sizes[size]} 
          ${colors[color]} 
          rounded-full 
          shadow-lg 
          hover:shadow-2xl 
          transition-all 
          duration-200 
          flex 
          items-center 
          justify-center 
          relative 
          z-10
          ${className}
        `}
      >
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {typeof icon === 'string' ? (
            <span className={`text-${iconSizes[size]}px`}>{icon}</span>
          ) : (
            React.cloneElement(icon, { size: iconSizes[size] })
          )}
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8,
            x: isHovered ? -10 : 10
          }}
          transition={{ duration: 0.2 }}
          className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none"
        >
          {tooltip}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </motion.div>
      )}
    </div>
  )
}

export default FloatingActionButton