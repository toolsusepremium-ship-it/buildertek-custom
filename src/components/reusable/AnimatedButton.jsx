import { motion } from 'motion/react'

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = "primary", // primary, secondary, outline
  size = "md", // sm, md, lg
  className = "",
  disabled = false,
  icon,
  iconPosition = "right", // left, right
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const iconVariants = {
    hover: {
      x: iconPosition === "right" ? 5 : -5,
      transition: { duration: 0.2 }
    }
  }

  const rippleVariants = {
    initial: { scale: 0, opacity: 0.5 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white rounded-lg"
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <motion.div variants={iconVariants}>
            {icon}
          </motion.div>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === "right" && (
          <motion.div variants={iconVariants}>
            {icon}
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}

export default AnimatedButton