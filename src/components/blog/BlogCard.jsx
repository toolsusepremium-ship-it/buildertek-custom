import { Link } from "react-router-dom"
import { cdnImage } from "../../lib/imageUrl"

const BlogCard = ({ blog }) => {
    return (
        <Link to={`/blog/${blog.slug}`} className="h-full">
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition h-full flex flex-col">
                {/* Image */}
                <img loading="lazy" decoding="async"
                    src={cdnImage(blog.image, 600)}
                    srcSet={`${cdnImage(blog.image, 400)} 400w, ${cdnImage(blog.image, 600)} 600w, ${cdnImage(blog.image, 900)} 900w`}
                    sizes="(max-width: 768px) 90vw, 380px"
                    alt={blog.title}
                    className="w-full h-auto object-contain rounded-lg"
                />
                {/* Category */}
                <span className="inline-block mt-4 text-sm font-normal text-[#126DFB] bg-[#F3F8FF] px-2 py-1 rounded">
                    {blog.category}
                </span>
                {/* Title */}
                <h3 className="mt-3 text-[20px] font-medium text-gray-800 leading-tight line-clamp-4">
                    {blog.title}
                </h3>
                {/* Date */}
                <p className="text-sm font-normal text-[#97989F] mt-2">
                    {blog.date}
                </p>
            </div>
        </Link>
    )
}

export default BlogCard
