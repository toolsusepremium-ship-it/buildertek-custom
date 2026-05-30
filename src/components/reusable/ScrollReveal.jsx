import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.8,
  distance = 50,
  className = "",
  once = true,
  threshold = 0.1
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: `-${threshold * 100}% 0px -${threshold * 100}% 0px` 
  })

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance }
      case 'down':
        return { opacity: 0, y: -distance }
      case 'left':
        return { opacity: 0, x: distance }
      case 'right':
        return { opacity: 0, x: -distance }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
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

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal