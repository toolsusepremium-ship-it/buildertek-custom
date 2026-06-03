import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const MINUTES = ['00', '15', '30', '45'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ── Validators ──────────────────────────────────────────────────────────────
const validate = {
    // Optional — only validate if user typed something
    fullName: (v) => {
        if (!v.trim()) return '';
        if (!/^[a-zA-Z\s\-']+$/.test(v.trim())) return 'Letters, spaces, and hyphens only';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 50) return 'Maximum 50 characters';
        return '';
    },
    company: (v) => {
        if (!v.trim()) return '';
        if (v.trim().length < 2) return 'Minimum 2 characters';
        if (v.trim().length > 100) return 'Maximum 100 characters';
        return '';
    },
    // Required
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
    // Optional textarea
    interest: (v) => (v.length > 500 ? 'Maximum 500 characters' : ''),
};

const validateAll = (data) => ({
    fullName: validate.fullName(data.fullName),
    company: validate.company(data.company),
    email: validate.email(data.email),
    phone: validate.phone(data.phone),
    interest: validate.interest(data.interest),
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

const SelectWrapper = ({ children }) => (
    <div className="relative">
        {children}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

// ── Main component ───────────────────────────────────────────────────────────
const FreeDemoForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        bestTimeHour: '',
        bestTimeMinute: '',
        month: '',
        interest: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (submitted && validate[name]) {
            setErrors((prev) => ({ ...prev, [name]: validate[name](value) }));
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

    const borderCls = (field) =>
        errors[field]
            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
            : 'border-gray-200 focus:border-[#1868f0] focus:ring-blue-500/10';

    const inputCls = (field) =>
        `w-full px-4 py-3 bg-gray-50/50 border rounded-[15px] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-700 font-semibold ${borderCls(field)}`;

    const selectCls = (field) => `${inputCls(field)} appearance-none cursor-pointer`;
    const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white rounded-[2rem] shadow-[0_22px_70px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10 border border-gray-100"
        >
            <header className="mb-7">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Request Demo</h2>
                <p className="text-gray-500 text-sm">Required fields are marked with an asterisk (*)</p>
            </header>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Full Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelCls}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={inputCls('fullName')}
                        />
                        <FieldError msg={errors.fullName} />
                    </div>
                    <div>
                        <label className={labelCls}>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={inputCls('company')}
                        />
                        <FieldError msg={errors.company} />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelCls}>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputCls('email')}
                        />
                        <FieldError msg={errors.email} />
                    </div>
                    <div>
                        <label className={labelCls}>Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 555-5555"
                            className={inputCls('phone')}
                        />
                        <FieldError msg={errors.phone} />
                    </div>
                </div>

                {/* Best Time To Call */}
                <div>
                    <label className={labelCls}>Best Time To Call</label>
                    <div className="flex gap-3">
                        <SelectWrapper>
                            <select
                                name="bestTimeHour"
                                value={formData.bestTimeHour}
                                onChange={handleChange}
                                className={selectCls('bestTimeHour')}
                            >
                                <option value="" disabled>Hours</option>
                                {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
                            </select>
                        </SelectWrapper>
                        <SelectWrapper>
                            <select
                                name="bestTimeMinute"
                                value={formData.bestTimeMinute}
                                onChange={handleChange}
                                className={selectCls('bestTimeMinute')}
                            >
                                <option value="" disabled>Minutes</option>
                                {MINUTES.map((m) => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </SelectWrapper>
                    </div>
                </div>

                {/* Month */}
                <div>
                    <label className={labelCls}>MM</label>
                    <SelectWrapper>
                        <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className={selectCls('month')}
                        >
                            <option value="" disabled>Select</option>
                            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </SelectWrapper>
                </div>

                {/* Interest */}
                <div>
                    <label className={labelCls}>
                        Why Are You Interested In BuilderTek Apps?
                        <span className="ml-2 text-gray-400 font-normal">
                            ({formData.interest.length}/500)
                        </span>
                    </label>
                    <textarea
                        name="interest"
                        placeholder="Why..."
                        rows="4"
                        value={formData.interest}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-50/50 border rounded-[15px] focus:bg-white focus:ring-4 transition-all outline-none resize-none text-gray-700 font-semibold ${borderCls('interest')}`}
                    />
                    <FieldError msg={errors.interest} />
                </div>

                {/* Submit */}
                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#155bd1', boxShadow: '0 25px 50px -12px rgba(24, 104, 240, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 bg-[#1868f0] text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 uppercase tracking-widest text-sm transition-all"
                >
                    SUBMIT REQUEST
                </motion.button>

                {submitted && Object.values(errors).some(Boolean) && (
                    <p className="text-center text-red-500 text-sm font-medium">
                        Please fix the errors above before submitting.
                    </p>
                )}
            </form>
        </motion.div>
    );
};

export default FreeDemoForm;
