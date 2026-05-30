import React, { useState } from 'react';
import { motion } from 'motion/react';

const ContactForm = ({ data }) => {
    // Fallback in case data is not passed
    if (!data) return null;

    const { title, subtitle, fields, footer } = data;

    const [formData, setFormData] = useState({
        department: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyType: '',
        comments: '',
        optIn: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
    };

    // Helper to render footer with links
    const renderFooter = (text) => {
        const parts = text.split(/(Privacy Policy|Terms of Service)/);
        return parts.map((part, index) => {
            if (part === 'Privacy Policy' || part === 'Terms of Service') {
                return (
                    <a key={index} href="#" className="text-[#1868f0] font-bold hover:underline transition-all">
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <div className="w-full relative overflow-visible">
            <div className="max-w-xl xl:max-w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-[2rem] shadow-[0_22px_70px_rgba(0,0,0,0.06)] p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 overflow-hidden"
                >
                    <header className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 mb-3 tracking-tight leading-tight">{title}</h2>
                        <p className="text-gray-500 text-base md:text-lg font-medium opacity-80">{subtitle}</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Select Department */}
                        <div className="space-y-3">
                            <label htmlFor="department" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">
                                {fields.department.label}
                            </label>
                            <div className="relative group">
                                <select
                                    id="department"
                                    name="department"
                                    required
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-2 bg-gray-50/50 border border-gray-200 rounded-[15px] focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none text-gray-700 font-semibold md:text-base cursor-pointer"
                                >
                                    <option value="" disabled>{fields.department.placeholder}</option>
                                    {fields.department.options.map((dept) => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Name Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-3">
                                <label htmlFor="firstName" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.firstName.label}</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-[15px] px-2 focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-700 font-semibold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="lastName" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.lastName.label}</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-[15px] px-2 focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-700 font-semibold"
                                />
                            </div>
                        </div>

                        {/* Email & Phone Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-3">
                                <label htmlFor="email" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.email.label}</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-[15px] px-2 focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-700 font-semibold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="phone" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.phone.label}</label>
                                <div className="flex gap-3 max-w-full">
                                    <div className="flex items-center gap-2 px-2 bg-gray-50/50 border border-gray-200 rounded-[1rem] w-[80px] shrink-0 justify-center text-gray-600 font-bold hover:border-blue-300 transition-colors cursor-pointer group">
                                        <img src="https://flagcdn.com/us.svg" alt="US" className="w-5 h-auto rounded-sm" />
                                        <svg className="w-3 h-3 group-hover:text-blue-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="flex-1 min-w-0 px-2 bg-gray-50/50 border border-gray-200 rounded-[15px] focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-700 font-semibold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-3">
                                <label htmlFor="companyName" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.companyName.label}</label>
                                <input
                                    id="companyName"
                                    type="text"
                                    name="companyName"
                                    required
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-[15px] px-2 focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-700 font-semibold"
                                />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="companyType" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.companyType.label}</label>
                                <div className="relative group">
                                    <select
                                        id="companyType"
                                        name="companyType"
                                        required
                                        value={formData.companyType}
                                        onChange={handleChange}
                                        className="w-full px-2 bg-gray-50/50 border border-gray-200 rounded-[15px] focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none text-gray-700 font-semibold cursor-pointer"
                                    >
                                        <option value="" disabled>{fields.companyType.placeholder}</option>
                                        {fields.companyType.options.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="space-y-3">
                            <label htmlFor="comments" className="block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1">{fields.comments.label}</label>
                            <textarea
                                id="comments"
                                name="comments"
                                placeholder={fields.comments.placeholder}
                                rows="5"
                                value={formData.comments}
                                onChange={handleChange}
                                className="w-full px-2 bg-gray-50/50 border border-gray-200 rounded-[15px] focus:bg-white focus:border-[#1868f0] focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none text-gray-700 font-semibold shadow-inner"
                            ></textarea>
                        </div>

                        {/* Opt-in Checkbox */}
                        <label className="flex items-start gap-6 cursor-pointer group mt-4">
                            <div className="mt-1 relative flex-shrink-0">
                                <input
                                    type="checkbox"
                                    name="optIn"
                                    checked={formData.optIn}
                                    onChange={handleChange}
                                    className="peer sr-only"
                                />
                                <div className="w-8 h-8 border-2 border-gray-200 rounded-xl bg-white peer-checked:bg-[#1868f0] peer-checked:border-[#1868f0] transition-all flex items-center justify-center group-hover:scale-110 group-hover:border-blue-400 shadow-sm">
                                    <svg className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-sm sm:text-base text-gray-500 group-hover:text-gray-900 transition-colors leading-relaxed font-normal">
                                {fields.optIn}
                            </span>
                        </label>

                        {/* Submit Button */}
                        <div className="pt-8">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: '#155bd1', boxShadow: '0 25px 50px -12px rgba(24, 104, 240, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full  px-2 py-2 bg-[#1868f0] text-white font-semibold rounded-2xl shadow-2xl shadow-blue-500/30 transition-all uppercase tracking-[0.05em] sm:tracking-[0.1em] text-sm sm:text-base flex items-center justify-center gap-3 group"
                            >
                                {fields.submitButton}
                                <svg className="w-7 h-7 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.button>
                        </div>

                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactForm;
