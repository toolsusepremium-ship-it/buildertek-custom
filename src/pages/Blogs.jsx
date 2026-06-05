import { useEffect } from "react"
import { motion } from "motion/react"
import blogsData from "../data/blogs.json"
import BlogCard from "../components/blog/BlogCard"
import Text from "../components/reusable/Text"

const Blogs = () => {
    useEffect(() => { document.title = 'Blogs - BuilderTek'; }, [])
    return (
        <>
            {/* Header */}
            <motion.div 
                className=" flex flex-col lg:flex-row text-white lg:items-center lg:justify-between mb-12 py-16 px-4 sm:px-6 lg:px-20 w-[85%] mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{"background": "linear-gradient(9.07deg, #126DFB -40.55%, #001A38 54.18%)"}}
            >
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Text
                        variant="subtitle"
                        color="primary-light"
                        className="inline-block  px-3 py-2 rounded no-underline"
                    >
                        {blogsData.sectionBadge}
                    </Text>

                    <Text
                        variant="h2-black"
                        color="white"
                        className="mt-2"
                        animated
                        delay={0.4}
                    >
                        {blogsData.title}
                    </Text>
                </motion.div>

                {/* Side Badge */}
                <motion.div 
                    className="mt-6 lg:mt-0 bg-white shadow-sm pl-3 pr-6 py-3 rounded-lg  max-w-[290px] text-right"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                >
                    <Text variant="body-base" color="primary">
                        {blogsData.sideBadge}
                    </Text>
                </motion.div>
            </motion.div>

            <section className="bg-white pb-20 px-4 sm:px-6 lg:px-20">
                <div className="w-[85%] mx-auto">

                    {/* Latest Post Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Text
                            variant="h4"
                            color="default"
                            className="mb-6"
                            animated
                        >
                            Latest Post
                        </Text>
                    </motion.div>

                    {/* Blog Grid */}
                    <motion.div
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {blogsData.blogs.map((blog, index) => (
                            <BlogCard key={blog.id} blog={blog} index={index} />
                        ))}
                    </motion.div>

                </div>
            </section>
        </>
    )
}

export default Blogs
