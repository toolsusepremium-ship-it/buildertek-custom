export const FinancialCom = ({ data }) => {
    return (
        
        <section style={{background: 'linear-gradient(180deg, #E7EFFF 0%, #FFFFFF 100%)'}} className="py-8 pb-3 sm:py-16 lg:py-24">
            <div className="container-main mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-12  lg:gap-8 items-start">
                    {/* Left Column - Title */}
                    <div className="lg:col-span-5 sm:card-padding lg:sticky lg:top-32">
                        <h2 className="text-3xl lg:text-[48px] font-normal leading-tight text-gray-900  mb-3 sm:mb-6">
                            {data.title}
                        </h2>
                    </div>

                    {/* Right Column - Steps List */}
                    <div className="lg:col-span-7 card-padding flex flex-col gap-6 pl-0 lg:pl-12">
                        {data.features.map((feature, index) => {
                            const stepNumber = String(index + 1).padStart(2, '0');
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="w-12 h-12 bg-[#FAF9F6] rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                            {stepNumber}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};