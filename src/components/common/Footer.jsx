import { useState } from "react";
import { Link } from "react-router-dom";
import footerData from "../../data/footerData.json";
import navbarData from "../../data/navbarData.json";
import { Mail } from "lucide-react";

const SHEETDB_URL = import.meta.env.VITE_SHEETDB_URL;

export default function Footer() {
  const { brand, links, newsletter, bottom } = footerData;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { email, date: new Date().toISOString() } }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const findPath = (label) => {
    // Exact match in top level menu
    const topMatch = navbarData.menu.find(m => m.label === label);
    if (topMatch?.path) return topMatch.path;

    // Search in dropdown items
    for (const menu of navbarData.menu) {
      if (menu.items) {
        const subMatch = menu.items.find(item => 
          item.label.toLowerCase() === label.toLowerCase() ||
          item.label.toLowerCase().includes(label.toLowerCase()) ||
          label.toLowerCase().includes(item.label.toLowerCase())
        );
        if (subMatch?.path) return subMatch.path;
      }
    }
    
    // Fallbacks for specific footer labels
    if (label === "Blog") return "/blogs";
    if (label === "Home") return "/";
    if (label === "About Us") return "/about";
    if (label === "Solutions") return "/solutions/rfq"; // Default solution
    
    return "#";
  };

  const quickLinksMapped = links.quickLinks.map(l => ({ label: l, path: findPath(l) }));
  const whoWeServeMapped = links.whoWeServe.map(l => ({ label: l, path: findPath(l) }));
  const servicesMapped = links.services.map(l => ({ label: l, path: findPath(l) }));

  return (
    <footer className="bg-white mt-10   card-padding " style={{boxShadow:"rgb(220, 221, 223) 1px -11px 20px 7px"}}>
      {/* TOP SECTION */}
      <div className="w-[90%] mx-auto  py-16">
  <div className="flex flex-wrap justify-between lg:flex-nowrap gap-10">

    {/* BRAND */}
    <div className="w-[280px]" >
      <img src={brand.logo} alt="BuilderTek" className="h-10 mb-4" />
      <p className="text-sm text-gray-600 mb-4 max-w-sm">
        {brand.description}
      </p>

      <div className="text-sm text-gray-700 space-y-1">
        <p><span className="font-semibold">Address :</span> {brand.address}</p>
        <p><span className="font-semibold">Email :</span> {brand.email}</p>
        <p><span className="font-semibold">Phone :</span> {brand.phone}</p>
      </div>
    </div>

    {/* LInks */}
{/* <div className="flex flex-[2] gap-20"> */}

  <div>
    <FooterColumn title="Quick Link" items={quickLinksMapped} />
  </div>

  <div>
    <FooterColumn title="Who We Serve" items={whoWeServeMapped} />
  </div>

  <div >
    <FooterColumn title="Services" items={servicesMapped} />
  </div>
  <div className="md:hidden w-1/2">
    <div className=" flex flex-col  gap-5 justify-start items-start sm:gap-5">

  <img src="/Frame 39319.svg" width={70} height={40} alt="" />
 <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000009wK46EAE"  target="_blank">
                       
  <img src="/Frame 39320.svg" width={80} height={40} alt="" />
  </a>
 </div>
  </div>

{/* </div> */}



    {/* NEWSLETTER */}
  <div>
      <div className="sm:w-[400px]">
      <div className="bg-[#F4F4F4] rounded-2xl p-8 h-full flex flex-col justify-between">
        <div>
          <h4 className="text-lg  text-center lg:text-xl font-semibold mb-2">
            {newsletter.title}
          </h4>
          <p className="text-base font-normal text-[#696A75] mb-6">
            {newsletter.subtitle}
          </p>

          <div className="relative mb-3">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              disabled={status === "loading" || status === "success"}
              className="w-full rounded-lg border px-4 py-3 pr-10 text-sm border-[#DCDDDF] focus:outline-none focus:ring-0 focus:ring-none disabled:opacity-50"
            />
            <Mail className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
          </div>
          {status === "success" && (
            <p className="text-green-600 text-xs text-center mb-3">Subscribed! Thank you.</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-xs text-center mb-3">Something went wrong. Try again.</p>
          )}
        </div>

        <button
          onClick={handleSubscribe}
          disabled={status === "loading" || status === "success"}
          className="w-full rounded-xl text-white bg-gradient-to-r from-[#3785FF] to-[#1146F2] py-3.5 font-medium cursor-pointer disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : newsletter.buttonText}
        </button>
      </div>
    </div>
  </div>

  </div>
<div className="flex pt-5 sm:pt-5 flex-col sm:flex-row gap-2 justify-center sm:justify-between sm:gap-5">

<div className="flex pt-4 sm:pt-5  gap-10 justify-center sm:justify-start sm:gap-5">
 
  <a href="#" className="hover:opacity-80">
  <img src="/Group.svg" alt="" />
  </a>
 <a href="https://www.facebook.com/buildertek" target="_blank" className="hover:opacity-80">
  <img src="/Group (1).svg" alt="" />
  </a>
 <a href="https://x.com/buildertek" target="_blank" className="hover:opacity-80">
  <img src="/Group (2).svg" alt="" />
  </a>
 <a href="#" className="hover:opacity-80">
  <img src="/SVG.svg" alt="" />
  </a>
 </div>
<div className=" hidden md:flex pt-5 sm:pt-5  gap-10 justify-center sm:justify-start sm:gap-5">

  <img src="/Frame 39319.svg" width={80} height={60} alt="" />
 <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000009wK46EAE"  target="_blank">
 
  <img src="/Frame 39320.svg" width={100} height={60} alt="" />
 </a> 
 </div>
</div>
</div>
      


      {/* BOTTOM BAR */}
      <div className="">
        <div className="w-[85%] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 border-t border-[#DCDDDF]">
          <p>{bottom.copyright}</p>

          <div className="flex gap-6">
            {bottom.legal.map((item, i) => (
              <a key={i} href="#" className={`hover:text-blue-600 ${i == 1 ? ' border-l border-r px-3 border-gray-300 ' : ''}`}>
          ￼     {item}
              </a>
            ))}
          </div>
        </div>
                   </div>
      
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="w-full">
      <h4 className="font-semibold mb-5 text-gray-900">
        {title}
      </h4>

      <ul className="space-y-3 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              to={item.path}
              className="hover:text-blue-600 cursor-pointer transition-colors block"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


















// import footerData from "../../data/footerData.json";
// import { Mail } from "lucide-react";

// export default function Footer() {
//   const { brand, links, newsletter, bottom } = footerData;

//   return (
//     <footer className="bg-white shadow-sm">
//       {/* TOP SECTION */}
//       <div className="w-[85%] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] gap-10">
        
//         {/* BRAND */}
//         <div>
//           <img src={brand.logo} alt="BuilderTek" className="h-10 mb-4" />
//           <p className="text-sm text-gray-600 mb-4">{brand.description}</p>

//           <div className="text-sm text-gray-700 space-y-1">
//             <p><span className="font-semibold">Address :</span> {brand.address}</p>
//             <p><span className="font-semibold">Email :</span> {brand.email}</p>
//             <p><span className="font-semibold">Phone :</span> {brand.phone}</p>
//           </div>
//         </div>

//         {/* QUICK LINKS */}
//         <FooterColumn title="Quick Link" items={links.quickLinks} />

//         {/* WHO WE SERVE */}
//         <FooterColumn title="Who We Serve" items={links.whoWeServe} />

//         {/* SERVICES */}
//         <FooterColumn title="Services" items={links.services} />

//         {/* NEWSLETTER */}
//         <div className="bg-[#F4F4F4] rounded-2xl p-6 flex flex-col justify-between">
//           <div>
//             <h4 className="text-lg font-semibold mb-2">{newsletter.title}</h4>
//             <p className="text-sm text-gray-600 mb-4">
//               {newsletter.subtitle}
//             </p>

//             <div className="relative mb-4">
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full rounded-lg border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <Mail className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           <button className="w-full rounded-xl bg-gradient-to-r from-[#3785FF] to-[#1146F2] text-white py-3 font-medium">
//             {newsletter.buttonText}
//           </button>
//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div className="">
//         <div className="w-[85%] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 border-t border-[#DCDDDF]">
//           <p>{bottom.copyright}</p>

//           <div className="flex gap-6">
//             {bottom.legal.map((item, i) => (
//               <a key={i} href="#" className="hover:text-blue-600">
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function FooterColumn({ title, items }) {
//   return (
//     <div>
//       <h4 className="font-semibold mb-4">{title}</h4>
//       <ul className="space-y-2 text-sm text-gray-600">
//         {items.map((item, i) => (
//           <li key={i} className="hover:text-blue-600 cursor-pointer">
//             {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }









// const Footer = ({ data }) => {
//   const { brand, links, newsletter, bottom } = data

//   return (
//     <footer className="bg-white border-t border-gray-200">
//       <div className="w-[85%] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-6 gap-4">

//         {/* Brand Info */}
//         <div className="lg:col-span-2 space-y-4 max-w-xs">
//           <img src={brand.logo} alt={brand.name} className="h-10" />

//           <p className="text-gray-600 text-sm whitespace-pre-line">
//             {brand.tagline}
//           </p>

//           <div className="text-sm text-gray-700 space-y-1">
//             <p><strong>Address :</strong> {brand.address}</p>
//             <p><strong>Email :</strong> {brand.email}</p>
//             <p><strong>Phone :</strong> {brand.phone}</p>
//           </div>
//         </div>

//         {/* Links */}
//         {Object.values(links).map((section, index) => (
//           <div key={index}>
//             <h4 className="font-semibold text-gray-900 mb-4">
//               {section.title}
//             </h4>
//             <ul className="space-y-2 text-sm text-gray-600">
//               {section.items.map((item, i) => (
//                 <li key={i} className="hover:text-blue-600 cursor-pointer">
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}

//         {/* Newsletter */}
//         <div className="bg-gray-50 rounded-2xl p-6">
//           <h4 className="font-semibold text-gray-900">
//             {newsletter.title}
//           </h4>
//           <p className="text-sm text-gray-600 mt-2">
//             {newsletter.subtitle}
//           </p>

//           <div className="mt-4 space-y-3">
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder={newsletter.placeholder}
//                 className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none"
//               />
//               <span className="absolute right-4 top-3.5 text-gray-400">
//                 ✉️
//               </span>
//             </div>

//             <button className="w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-blue-700">
//               {newsletter.buttonText}
//             </button>
//           </div>
//         </div>
//       </div>


//       {/* Bottom Bar */}
//       <div className="border-t border-gray-200 py-6">
//         <div className="w-[85%] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
//           <p>{bottom.copyright}</p>

//           <div className="flex gap-6">
//             {bottom.policies.map((policy, i) => (
//               <span key={i} className="hover:text-blue-600 cursor-pointer">
//                 {policy}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer










// import { motion } from 'motion/react'
// import { Link } from 'react-router-dom'
// import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

// const Footer = () => {
//   const footerSections = [
//     {
//       title: 'Solutions',
//       links: [
//         { name: 'Quote Management', path: '/solutions/quote-management' },
//         { name: 'RFQ Management', path: '/solutions/rfq-management' },
//         { name: 'Project Management', path: '/solutions' },
//         { name: 'Vendor Management', path: '/solutions' },
//       ]
//     },
//     {
//       title: 'Company',
//       links: [
//         { name: 'About Us', path: '/about' },
//         { name: 'Careers', path: '/careers' },
//         { name: 'News', path: '/news' },
//         { name: 'Contact', path: '/contact' },
//       ]
//     },
//     {
//       title: 'Support',
//       links: [
//         { name: 'Help Center', path: '/help' },
//         { name: 'Documentation', path: '/docs' },
//         { name: 'API Reference', path: '/api' },
//         { name: 'Status', path: '/status' },
//       ]
//     }
//   ]

//   const socialLinks = [
//     { icon: Facebook, href: '#', label: 'Facebook' },
//     { icon: Twitter, href: '#', label: 'Twitter' },
//     { icon: Linkedin, href: '#', label: 'LinkedIn' },
//     { icon: Instagram, href: '#', label: 'Instagram' },
//   ]

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Company Info */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-2xl font-bold text-blue-400 mb-4">BuilderTek</h3>
//               <p className="text-gray-300 mb-6 max-w-md">
//                 Streamline your construction projects with our comprehensive management platform. 
//                 From quotes to completion, we've got you covered.
//               </p>
              
//               <div className="space-y-3">
//                 <div className="flex items-center space-x-3">
//                   <Mail size={18} className="text-blue-400" />
//                   <span className="text-gray-300">contact@buildertek.com</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <Phone size={18} className="text-blue-400" />
//                   <span className="text-gray-300">+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <MapPin size={18} className="text-blue-400" />
//                   <span className="text-gray-300">123 Construction Ave, Builder City, BC 12345</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Footer Links */}
//           {footerSections.map((section, index) => (
//             <motion.div
//               key={section.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
//               <ul className="space-y-2">
//                 {section.links.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       to={link.path}
//                       className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom Section */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="border-t border-gray-800 mt-12 pt-8"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-gray-400 text-sm mb-4 md:mb-0">
//               © 2024 BuilderTek. All rights reserved.
//             </div>
            
//             {/* Social Links */}
//             <div className="flex space-x-4">
//               {socialLinks.map((social) => (
//                 <motion.a
//                   key={social.label}
//                   href={social.href}
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
//                   aria-label={social.label}
//                 >
//                   <social.icon size={20} />
//                 </motion.a>
//               ))}
//             </div>
//           </div>
          
//           <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-6 mt-4 text-sm text-gray-400">
//             <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-200">
//               Privacy Policy
//             </Link>
//             <Link to="/terms" className="hover:text-blue-400 transition-colors duration-200">
//               Terms of Service
//             </Link>
//             <Link to="/cookies" className="hover:text-blue-400 transition-colors duration-200">
//               Cookie Policy
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   )
// }

// export default Footer