import { Link } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import navData from "../../data/navbarData.json"

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="w-[85%] mx-auto">
                <div className="flex-between h-16 sm:h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={navData.logo.src}
                            alt={navData.logo.alt}
                            className="h-[30px] w-[200px] sm:h-[35px] sm:w-[240px] lg:h-[43px] lg:w-[293px]"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center space-x-6 xl:space-x-8 text-sm font-medium text-gray-800">
                        {navData.menu.map((item, index) =>
                            item.dropdown ? (
                                <NavDropdown key={index} item={item} />
                            ) : (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className="hover:text-blue-600 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Desktop CTA + Mobile Menu Button */}
                    <div className="flex items-center gap-3">
                        {/* Desktop CTA Button */}
                        {<Link
                            to={navData.cta.path}
                            className="hidden lg:inline-flex px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-white bg-gradient-to-r from-[#3785FF] to-[#1146F2] b   text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                        >
                            {navData.cta.label}
                        </Link>
                        }
                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} className="text-gray-600" />
                            ) : (
                                <Menu size={24} className="text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="xl:hidden bg-white border-t border-gray-200 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto"
                    >
                        <div className="container-main py-4">
                            <div className="flex flex-col space-y-4">
                                {navData.menu.map((item, index) =>
                                    item.dropdown ? (
                                        <MobileNavDropdown
                                            key={index}
                                            item={item}
                                            onClose={() => setIsMobileMenuOpen(false)}
                                        />
                                    ) : (
                                        <Link
                                            key={index}
                                            to={item.path}
                                            className="text-gray-800 hover:text-blue-600 py-2 transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                )}

                                {/* Mobile CTA Button */}
                                <a
                                    target="_blank"
                                    href="https://buildertek3-dev-ed.develop.my.site.com/CaseManagement/login"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[#3785FF] to-[#1146F2]    text-sm mt-4 w-full transition-all duration-300 hover:scale-105"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {navData.cta.label}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar

/* Desktop Dropdown Item */
const NavDropdown = ({ item }) => {
    return (
        <div className="relative group cursor-pointer">
            <Link to={item.path} className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
                {item.label}
                <ChevronDown size={14} />
            </Link>

            <div className="absolute top-full left-0 mt-3 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {item.items.map((subItem, i) => (
                    <Link
                        key={i}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                        {subItem.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

/* Mobile Dropdown Item */
const MobileNavDropdown = ({ item, onClose }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-gray-100 pb-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-gray-800 hover:text-blue-600 py-2 transition-colors duration-200"
            >
                {item.label}
                <ChevronDown
                    size={14}
                    className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 mt-2 space-y-2"
                    >
                        {item.items.map((subItem, i) => (
                            <Link
                                key={i}
                                to={subItem.path}
                                className="block text-sm text-gray-600 hover:text-blue-600 py-1 transition-colors duration-200"
                                onClick={onClose}
                            >
                                {subItem.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

