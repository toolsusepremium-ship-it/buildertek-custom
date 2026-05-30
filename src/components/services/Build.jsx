import { useState } from 'react';

export const Build = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="container-main mx-auto px-4 sm-10  sm:py-12 lg:py-24">
          {!data?.title1&&  <h2 className="text-3xl lg:text-[48px] font-normal text-center leading-tight mb-6 sm:mb-12 lg:mb-20">
                {data.title}
            </h2>}
         {data?.description&& <div className="flex justify-center mb-12 "><p className="text-gray-600 text-center sm:-mt-10 -mt-5  leading-relaxed max-w-[700px]">
                {data.description}
            </p></div>}
            {data?.title1&&<>
              <h2 className="text-3xl lg:text-[48px] text-center font-normal  leading-tight">
                {data.title1}
            </h2>
            <h3 className='text-center sm:mb-12 lg:mb-20 text-gray-400'>
                {data.title}
            </h3>
        
            </>}

            <div className="grid card-padding grid-cols-1 lg:grid-cols-2 sm:gap-12 gap-x-12  gap-y-7 lg:gap-20 items-start">
                {/* Left Column - Features List */}
                <div className="flex flex-col space-y-4">
                    {data.features.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`cursor-pointer transition-all duration-300 font-normal ${activeIndex === index
                                ? 'bg-[#F2F6FE] p-6 rounded-xl ' // Active styles
                                : 'p-4 hover:bg-gray-50 rounded-xl' // Inactive styles
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={feature.icon}
                                    alt=""
                                    className={`w-6 h-6 object-contain ${activeIndex === index ? 'opacity-100' : 'opacity-70 '}`}
                                />
                                <h3 className={`text-lg lg:text-xl ${activeIndex === index ? 'font-semibold text-gray-900' : 'font-normal text-gray-900'}`}>
                                    {feature.title}
                                </h3>
                            </div>

                            {activeIndex === index && feature.description && (
                                <p className="mt-3 text-gray-600 leading-relaxed ml-10">
                                    {feature.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Column - Image */}
                <div className="relative h-full sm:min-h-[400px] min-h-[300px] rounded-3xl  flex items-center justify-center">
                    {data.features[activeIndex].image ? (
                        <img
                            src={data.features[activeIndex].image}
                            alt={data.features[activeIndex].title}
                            className="w-full h-3/4 sm:h-full object-contain rounded-2xl shadow-lg "
                            
                        />
                    ) : (
                        <div className="text-gray-400">Image Placeholder</div>
                    )}
                </div>
            </div>
        </div>
    );
};