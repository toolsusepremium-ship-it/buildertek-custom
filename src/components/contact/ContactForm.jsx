import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

// ── Validators ──────────────────────────────────────────────────────────────
const validate = {
    department: (v) => (!v ? 'Please select a department' : ''),

    firstName: (v) => {
        if (!v.trim()) return 'First name is required';
        if (!/^[a-zA-Z\s\-']+$/.test(v.trim())) return 'Letters, spaces, and hyphens only';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 50) return 'Maximum 50 characters';
        return '';
    },

    lastName: (v) => {
        if (!v.trim()) return 'Last name is required';
        if (!/^[a-zA-Z\s\-']+$/.test(v.trim())) return 'Letters, spaces, and hyphens only';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 50) return 'Maximum 50 characters';
        return '';
    },

    email: (v) => {
        if (!v.trim()) return 'Email is required';
        if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v))
            return 'Enter a valid email address';
        return '';
    },

    phone: (v) => {
        if (!v.trim()) return 'Phone number is required';
        const digits = v.replace(/\D/g, '');
        if (digits.length < 10) return 'Enter a valid 10-digit US phone number';
        if (digits.length > 11) return 'Phone number is too long';
        if (digits.length === 11 && digits[0] !== '1') return 'US numbers must start with +1';
        return '';
    },

    companyName: (v) => {
        if (!v.trim()) return 'Company name is required';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 100) return 'Maximum 100 characters';
        return '';
    },

    companyType: (v) => (!v ? 'Please select a company type' : ''),

    comments: (v) => (v.length > 500 ? 'Maximum 500 characters' : ''),
};

const validateAll = (data) => ({
    department: validate.department(data.department),
    firstName: validate.firstName(data.firstName),
    lastName: validate.lastName(data.lastName),
    email: validate.email(data.email),
    phone: validate.phone(data.phone),
    companyName: validate.companyName(data.companyName),
    companyType: validate.companyType(data.companyType),
    comments: validate.comments(data.comments),
});

// ── Error message component ──────────────────────────────────────────────────
const FieldError = ({ msg }) =>
    msg ? (
        <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {msg}
        </p>
    ) : null;

// ── Main component ───────────────────────────────────────────────────────────
const ContactForm = ({ data }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        department: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        companyType: '',
        comments: '',
        optIn: false,
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    if (!data) return null;

    const { title, subtitle, fields, footer } = data;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: newValue }));

        if (submitted && validate[name]) {
            setErrors((prev) => ({ ...prev, [name]: validate[name](newValue) }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const newErrors = validateAll(formData);
        setErrors(newErrors);
        if (Object.values(newErrors).every((err) => !err)) {
            navigate('/thank-you');
        }
    };

    // Dynamic border: red on error, blue on focus normally
    const borderCls = (field) =>
        errors[field]
            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
            : 'border-gray-200 focus:border-[#1868f0] focus:ring-blue-500/10';

    const inputBase = 'w-full bg-gray-50/50 border rounded-[15px] px-2 py-2 focus:bg-white focus:ring-4 transition-all outline-none text-gray-700 font-semibold';
    const selectBase = `${inputBase} appearance-none cursor-pointer`;
    const labelBase = 'block text-sm font-bold text-gray-800 tracking-wider uppercase ml-1';

    const renderFooter = (text) => {
        const parts = text.split(/(Privacy Policy|Terms of Service)/);
        return parts.map((part, i) =>
            part === 'Privacy Policy' || part === 'Terms of Service' ? (
                <a key={i} href="#" className="text-[#1868f0] font-bold hover:underline transition-all">
                    {part}
                </a>
            ) : part
        );
    };

    return (
        <div className="w-full relative overflow-visible">
            <div className="max-w-xl xl:max-w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="bg-white rounded-[2rem] shadow-[0_22px_70px_rgba(0,0,0,0.06)] p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-100 overflow-hidden"
                >
                    <header className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl md:text-[38px] font-bold text-gray-900 mb-3 tracking-tight leading-tight">{title}</h2>
                        <p className="text-gray-500 text-base md:text-lg font-medium opacity-80">{subtitle}</p>
                    </header>

                    <form onSubmit={handleSubmit} noValidate className="space-y-8">
                        {/* Department */}
                        <div className="space-y-1.5">
                            <label htmlFor="department" className={labelBase}>{fields.department.label}</label>
                            <div className="relative group">
                                <select
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className={`${selectBase} ${borderCls('department')} md:text-base`}
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
                            <FieldError msg={errors.department} />
                        </div>

                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label htmlFor="firstName" className={labelBase}>{fields.firstName.label}</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('firstName')}`}
                                />
                                <FieldError msg={errors.firstName} />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="lastName" className={labelBase}>{fields.lastName.label}</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('lastName')}`}
                                />
                                <FieldError msg={errors.lastName} />
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label htmlFor="email" className={labelBase}>{fields.email.label}</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('email')}`}
                                />
                                <FieldError msg={errors.email} />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="phone" className={labelBase}>{fields.phone.label}</label>
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
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(555) 555-5555"
                                        className={`flex-1 min-w-0 px-2 py-2 bg-gray-50/50 border rounded-[15px] focus:bg-white focus:ring-4 transition-all outline-none text-gray-700 font-semibold ${borderCls('phone')}`}
                                    />
                                </div>
                                <FieldError msg={errors.phone} />
                            </div>
                        </div>

                        {/* Company Name & Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label htmlFor="companyName" className={labelBase}>{fields.companyName.label}</label>
                                <input
                                    id="companyName"
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('companyName')}`}
                                />
                                <FieldError msg={errors.companyName} />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="companyType" className={labelBase}>{fields.companyType.label}</label>
                                <div className="relative group">
                                    <select
                                        id="companyType"
                                        name="companyType"
                                        value={formData.companyType}
                                        onChange={handleChange}
                                        className={`${selectBase} ${borderCls('companyType')}`}
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
                                <FieldError msg={errors.companyType} />
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="space-y-1.5">
                            <label htmlFor="comments" className={labelBase}>
                                {fields.comments.label}
                                <span className="ml-2 text-gray-400 font-normal normal-case tracking-normal">
                                    ({formData.comments.length}/500)
                                </span>
                            </label>
                            <textarea
                                id="comments"
                                name="comments"
                                placeholder={fields.comments.placeholder}
                                rows="5"
                                value={formData.comments}
                                onChange={handleChange}
                                className={`w-full px-2 py-2 bg-gray-50/50 border rounded-[15px] focus:bg-white focus:ring-4 transition-all outline-none resize-none text-gray-700 font-semibold shadow-inner ${borderCls('comments')}`}
                            />
                            <FieldError msg={errors.comments} />
                        </div>

                        {/* Opt-in */}
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

                        {/* Submit */}
                        <div className="pt-8">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: '#155bd1', boxShadow: '0 25px 50px -12px rgba(24, 104, 240, 0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full px-2 py-3 bg-[#1868f0] text-white font-semibold rounded-2xl shadow-2xl shadow-blue-500/30 transition-all uppercase tracking-[0.05em] sm:tracking-[0.1em] text-sm sm:text-base flex items-center justify-center gap-3 group"
                            >
                                {fields.submitButton}
                                <svg className="w-7 h-7 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.button>
                        </div>

                        {submitted && Object.values(errors).some(Boolean) && (
                            <p className="text-center text-red-500 text-sm font-medium">
                                Please fix the errors above before submitting.
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactForm;
