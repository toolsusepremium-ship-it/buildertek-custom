import { Link } from "react-router-dom"

// Original centered CTA section used on Solutions page
const CenteredCtaSection = ({ data }) => {
    return (
        <section className="sm:py-20 py-10 sm:mt-10  card-padding">
            <div className="max-w-6xl   mx-auto px-6 text-center rounded-2xl bg-[#F4F4F4] sm:px-16 sm:pt-16 py-10">

                {/* Title */}
                <h2 className="text-3xl lg:text-5xl font-normal sm:leading-14 leading-11 text-gray-900 max-w-[767px] mx-auto">
                    {data.title}{" "}
                    {data.nor && <span className="whitespace-nowrap">{data.nor}</span>}
                    <br />
                    <span className="text-[#126DFB]">
                        {data.highlight}
                    </span>
                    {
                        data.title2 && (
                            <div className="">
                                {" "}{data.title2}
                            </div>
                        )
                    }
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-600  text-base lg:text-xl font-normal max-w-[767px] mx-auto">
                    {data.description}
                </p>

                {/* CTA Button */}
                <div className="mt-8 sm:my-8 sm:mb-16">
                    <a
                        href={data.cta.link}
                        className="inline-flex items-center justify-center text-xl px-8 py-3 rounded-2xl font-semibold  text-white bg-gradient-to-r from-[#3785FF] to-[#1146F2]    hover:opacity-90 transition"
                    >
                        {data.cta.label}
                    </a>
                </div>

                {data.image &&
                    <div className="mt-1 hidden  shadow-lg p-4 max-w-[995px] bg-[#E9E9EA]">
                        <img
                            src={data.image}
                            alt="RFQ Preview"
                            className="w-full h-full rounded-l-xl rounded-r-xl"
                        />
                    </div>}

            </div>
        </section>
    )
}

export default CenteredCtaSection
