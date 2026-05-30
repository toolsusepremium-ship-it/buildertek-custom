import { motion } from 'motion/react'

const AnimatedContainer = ({ 
  children, 
  className = "",
  delay = 0,
  direction = "up", // up, down, left, right, scale, fade
  stagger = false,
  staggerDelay = 0.1,
  duration = 0.8,
  ...props 
}) => {
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 }
      case 'down':
        return { opacity: 0, y: -50 }
      case 'left':
        return { opacity: 0, x: -50 }
      case 'right':
        return { opacity: 0, x: 50 }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'scale':
        return { opacity: 1, scale: 1 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  const containerVariants = stagger ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  } : null

  const itemVariants = stagger ? {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        duration,
        ease: "easeOut"
      }
    }
  } : null

  if (stagger) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={className}
        {...props}
      >
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={itemVariants}>{children}</motion.div>
        }
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={getAnimateState()}
      transition={{ duration, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedContainer