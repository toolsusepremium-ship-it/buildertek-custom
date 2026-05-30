import { useState } from "react"

const FaqSection = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="bg-white py-24 card-padding">
            <div className="max-w-4xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl lg:text-4xl font-semibold text-black">
                        {data.title}
                    </h3>
                    <p className="mt-3 text-xl font-normal text-gray-600">
                        {data.subtitle}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {data.items.map((item, index) => {
                        const isOpen = activeIndex === index

                        return (
                            <div
                                key={index}
                                className="border border-gray-200 bg-[#F7F7F7] rounded-xl px-6 py-5"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex justify-between items-center text-left"
                                >
                                    <span className="text-[#020805] font-medium text-xl">
                                        {item.question}
                                    </span>
                                    <span className="text-xl font-medium text-gray-600">
                                        {isOpen ? "–" : "+"}
                                    </span>
                                </button>

                                {isOpen && (
                                    <p className="mt-4 text-gray-600 text-[18px] leading-relaxed">
                                        {item.answer}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default FaqSection
