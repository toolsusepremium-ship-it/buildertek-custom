import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";

const ServiceFeature = ({ data, reverse ,form}) => {
    
    const location=useLocation()
    return (
        <section className={`sm:py-24 sm:pb-10 ${location.pathname=="/services/construction"?"py-10 pb-5":"py-5"}  bg-white`}>
            <div className="w-[85%] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 sm:gap-16 items-start">

                    {/* LEFT CONTENT */}
                    <div className={`max-w-xl ${reverse ? "lg:order-2" : "lg:order-1"}`}>
                        {/* Badge */}
                        {data.badge && <span className="inline-block mb-6 px-4 my-4 py-1.5 rounded-md text-sm font-medium
              bg-blue-50 text-blue-600">
                            {data.badge}
                        </span>}

                        {/* Title */}
                        <h2 className="text-3xl lg:text-[54px] font-normal leading-tight mb-6">
                            {data.title}
                        </h2>

                        {/* Description */}
                        <p className="text-[15px] sm:text-[17px] lg:text-[20px] text-gray-600 text-pre-line sm:mb-10" >
                            {data.description}
                        </p>

                        {/* Bullet Points */}
                   {data?.features&&data?.features.length>0&&     <ul className="space-y-4">
                            {data.features.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-800">
                                   
                                        <img src="/assets/who-we-are/why-general/tick.svg" className="mt-1" alt="" />
                                    
                                    <span className="text-base">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>}
                    </div>

                    {/* RIGHT IMAGE */}
                {data?.image&&    <div className={`flex max-w-xl justify-center ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                        <div className="w-full rounded-2xl p-0">
                            <img
                                src={data.image}
                                alt={data.title}
                                className="rounded-xl w-full h-auto object-contain"
                            />
                        </div>
                    </div>}

                </div>
            </div>
        </section>
    );
};

export default ServiceFeature;
