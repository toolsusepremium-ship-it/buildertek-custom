import { motion } from 'motion/react'

const Text = ({
  variant = 'body',
  children,
  className = '',
  color = 'default', // pass "custom" to skip built-in color classes
  animated = false,
  delay = 0,
  ...props
}) => {
  // Define typography variants
  const variants = {
    // Headings
    h1: 'text-4xl lg:text-5xl xl:text-[70px] font-bold leading-tight',
    h2: 'text-3xl md:text-4xl lg:text-[54px] font-bold leading-tight',
    'h2-black': 'text-3xl md:text-4xl lg:text-[54px] font-bold leading-tight', // Extra bold h2
    'h2-solution': 'text-3xl md:text-4xl lg:text-[48px] font-normal leading-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold leading-tight',
    h4: 'text-xl md:text-2xl font-semibold leading-tight',
    h5: 'text-lg md:text-xl font-medium leading-tight text-[#6F6F6F]',
    h6: 'text-base md:text-lg font-semibold leading-tight',

    // Body text
    body: 'text-base md:text-lg leading-relaxed text-right',
    'body-lg': 'text-lg md:text-xl leading-7 font-normal',
    'body-lg-left': 'text-baase md:text-lg leading-7 font-normal text-left',
    'body-sm': 'text-sm leading-relaxed',
    'body-base': ' md:text-base lg:text-lg leading-relaxed',

    // Special variants
    subtitle: 'text-blue-600 font-semibold text-sm uppercase tracking-wide',
    caption: 'text-xs text-gray-500',
    lead: 'text-lg md:text-xl leading-relaxed font-medium',
  }

  // Define color variants
  const colors = {
    default: 'text-gray-900',
    primary: 'text-[#032D60]',
    'primary-light': 'text-blue-600',
    'primary-dark': 'text-[#032D60]',
    secondary: 'text-[#505C7A]',
    muted: 'text-gray-600',
    light: 'text-gray-500',
    white: 'text-white',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
  }

  // Get the appropriate HTML tag based on variant
  const getTag = (variant) => {
    if (variant.startsWith('h')) return variant
    return 'p'
  }

  const Tag = getTag(variant)
  const colorClass = color === 'custom' ? '' : (colors[color] || colors.default)
  const baseClasses = `${variants[variant] || variants.body} ${colorClass} ${className}`

  // Animation variants for motion
  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay
      }
    }
  }

  if (animated) {
    // Separate spacing/layout classes from typography classes
    const spacingClasses = className.split(' ').filter(cls =>
      cls.startsWith('m') || cls.startsWith('p') || cls.includes('gap') ||
      cls.includes('space') || cls.startsWith('w-') || cls.startsWith('h-') ||
      cls.includes('flex') || cls.includes('grid') || cls.includes('block') ||
      cls.includes('inline') || cls.includes('absolute') || cls.includes('relative')
    ).join(' ')

    const typographyClasses = className.split(' ').filter(cls =>
      !cls.startsWith('m') && !cls.startsWith('p') && !cls.includes('gap') &&
      !cls.includes('space') && !cls.startsWith('w-') && !cls.startsWith('h-') &&
      !cls.includes('flex') && !cls.includes('grid') && !cls.includes('block') &&
      !cls.includes('inline') && !cls.includes('absolute') && !cls.includes('relative')
    ).join(' ')

    const textClasses = `${variants[variant] || variants.body} ${colorClass} ${typographyClasses}`

    return (
      <motion.div
        variants={animationVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={spacingClasses} // Apply spacing classes to wrapper
      >
        <Tag className={textClasses} {...props}>
          {children}
        </Tag>
      </motion.div>
    )
  }

  return (
    <Tag className={baseClasses} {...props}>
      {children}
    </Tag>
  )
}

export default Text