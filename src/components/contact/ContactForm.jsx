import React, { useState } from 'react';
import { motion } from 'motion/react';

// Salesforce custom field IDs
const SF_DEPT = '00Nak00003zqYtl';
const SF_CTYPE = '00Nak00003zpcBV';

// ── Validators ──────────────────────────────────────────────────────────────
const validate = {
    [SF_DEPT]: (v) => (!v ? 'Please select a department' : ''),

    first_name: (v) => {
        if (!v.trim()) return 'First name is required';
        if (!/^[a-zA-Z\s\-']+$/.test(v.trim())) return 'Letters, spaces, and hyphens only';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 40) return 'Maximum 40 characters';
        return '';
    },

    last_name: (v) => {
        if (!v.trim()) return 'Last name is required';
        if (!/^[a-zA-Z\s\-']+$/.test(v.trim())) return 'Letters, spaces, and hyphens only';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 80) return 'Maximum 80 characters';
        return '';
    },

    email: (v) => {
        if (!v.trim()) return 'Email is required';
        if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v))
            return 'Enter a valid email address';
        return '';
    },

    mobile: (v) => {
        if (!v.trim()) return 'Phone number is required';
        const digits = v.replace(/\D/g, '');
        if (digits.length < 10) return 'Enter a valid 10-digit US phone number';
        if (digits.length > 11) return 'Phone number is too long';
        if (digits.length === 11 && digits[0] !== '1') return 'US numbers must start with +1';
        return '';
    },

    company: (v) => {
        if (!v.trim()) return 'Company name is required';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 40) return 'Maximum 40 characters';
        return '';
    },

    [SF_CTYPE]: (v) => (!v ? 'Please select a company type' : ''),

    description: (v) => (v.length > 500 ? 'Maximum 500 characters' : ''),
};

const validateAll = (data) => ({
    [SF_DEPT]: validate[SF_DEPT](data[SF_DEPT]),
    first_name: validate.first_name(data.first_name),
    last_name: validate.last_name(data.last_name),
    email: validate.email(data.email),
    mobile: validate.mobile(data.mobile),
    company: validate.company(data.company),
    [SF_CTYPE]: validate[SF_CTYPE](data[SF_CTYPE]),
    description: validate.description(data.description),
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
    const [formData, setFormData] = useState({
        [SF_DEPT]: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        company: '',
        [SF_CTYPE]: '',
        description: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    if (!data) return null;

    const { title, subtitle, fields, footer } = data;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (submitted && validate[name]) {
            setErrors((prev) => ({ ...prev, [name]: validate[name](newValue) }));
        }
    };

    const handleSubmit = (e) => {
        setSubmitted(true);
        const newErrors = validateAll(formData);
        setErrors(newErrors);
        if (!Object.values(newErrors).every((err) => !err)) {
            e.preventDefault(); // block native POST only if validation fails
        }
        // valid → native form POST proceeds to Salesforce
    };

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

                    <form
                        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00Dak00000LHFzR"
                        method="POST"
                        onSubmit={handleSubmit}
                        noValidate
                        className="space-y-8"
                    >
                        {/* Salesforce required hidden fields */}
                        <input type="hidden" name="oid" value="00Dak00000LHFzR" />
                        <input type="hidden" name="retURL" value="https://buildertek.vercel.app/thank-you" />

                        {/* Department */}
                        <div className="space-y-1.5">
                            <label htmlFor={SF_DEPT} className={labelBase}>{fields.department.label}</label>
                            <div className="relative group">
                                <select
                                    id={SF_DEPT}
                                    name={SF_DEPT}
                                    value={formData[SF_DEPT]}
                                    onChange={handleChange}
                                    className={`${selectBase} ${borderCls(SF_DEPT)} md:text-base`}
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
                            <FieldError msg={errors[SF_DEPT]} />
                        </div>

                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label htmlFor="first_name" className={labelBase}>{fields.firstName.label}</label>
                                <input
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    maxLength={40}
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('first_name')}`}
                                />
                                <FieldError msg={errors.first_name} />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="last_name" className={labelBase}>{fields.lastName.label}</label>
                                <input
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    maxLength={80}
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('last_name')}`}
                                />
                                <FieldError msg={errors.last_name} />
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
                                    maxLength={80}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('email')}`}
                                />
                                <FieldError msg={errors.email} />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="mobile" className={labelBase}>{fields.phone.label}</label>
                                <div className="flex gap-3 max-w-full">
                                    <div className="flex items-center gap-2 px-2 bg-gray-50/50 border border-gray-200 rounded-[1rem] w-[80px] shrink-0 justify-center text-gray-600 font-bold hover:border-blue-300 transition-colors cursor-pointer group">
                                        <img src="https://flagcdn.com/us.svg" alt="US" className="w-5 h-auto rounded-sm" />
                                        <svg className="w-3 h-3 group-hover:text-blue-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <input
                                        id="mobile"
                                        type="tel"
                                        name="mobile"
                                        maxLength={40}
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="(555) 555-5555"
                                        className={`flex-1 min-w-0 px-2 py-2 bg-gray-50/50 border rounded-[15px] focus:bg-white focus:ring-4 transition-all outline-none text-gray-700 font-semibold ${borderCls('mobile')}`}
                                    />
                                </div>
                                <FieldError msg={errors.mobile} />
                            </div>
                        </div>

                        {/* Company Name & Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label htmlFor="company" className={labelBase}>{fields.companyName.label}</label>
                                <input
                                    id="company"
                                    type="text"
                                    name="company"
                                    maxLength={40}
                                    value={formData.company}
                                    onChange={handleChange}
                                    className={`${inputBase} ${borderCls('company')}`}
                                />
                                <FieldError msg={errors.company} />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor={SF_CTYPE} className={labelBase}>{fields.companyType.label}</label>
                                <div className="relative group">
                                    <select
                                        id={SF_CTYPE}
                                        name={SF_CTYPE}
                                        value={formData[SF_CTYPE]}
                                        onChange={handleChange}
                                        className={`${selectBase} ${borderCls(SF_CTYPE)}`}
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
                                <FieldError msg={errors[SF_CTYPE]} />
                            </div>
                        </div>

                        {/* Comments / Description */}
                        <div className="space-y-1.5">
                            <label htmlFor="description" className={labelBase}>
                                {fields.comments.label}
                                <span className="ml-2 text-gray-400 font-normal normal-case tracking-normal">
                                    ({formData.description.length}/500)
                                </span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder={fields.comments.placeholder}
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                className={`w-full px-2 py-2 bg-gray-50/50 border rounded-[15px] focus:bg-white focus:ring-4 transition-all outline-none resize-none text-gray-700 font-semibold shadow-inner ${borderCls('description')}`}
                            />
                            <FieldError msg={errors.description} />
                        </div>

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
