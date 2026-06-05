import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { Facebook, Linkedin, Twitter, Share2, ArrowLeft, Clock, Calendar } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import blogsData from '../data/blogs.json'
import Text from '../components/reusable/Text'

const ContentRenderer = ({ content }) => {
  return (
    <div className="prose-buildertek">
      {content.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className="text-[#505C7A] text-base md:text-[17px] leading-[1.85] mb-5">
                {block.text}
              </p>
            )
          case 'h3':
            return (
              <h3 key={idx} className="text-xl md:text-2xl font-bold text-[#032D60] mt-10 mb-4 leading-tight">
                {block.text}
              </h3>
            )
          case 'h4':
            return (
              <h4 key={idx} className="text-lg md:text-xl font-semibold text-[#032D60] mt-7 mb-3 leading-tight">
                {block.text}
              </h4>
            )
          case 'list':
            return (
              <ul key={idx} className="list-disc pl-6 mb-6 space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="text-[#505C7A] text-base md:text-[17px] leading-[1.85]">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'quote':
            return (
              <blockquote key={idx} className="border-l-4 border-[#126DFB] pl-5 pr-4 py-3 my-8 bg-[#F3F8FF] rounded-r-lg">
                <p className="text-[#032D60] text-base md:text-lg font-medium italic leading-relaxed">
                  {block.text}
                </p>
              </blockquote>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

const RelatedBlogCard = ({ blog }) => (
  <Link to={`/blog/${blog.slug}`} className="block group">
    <div className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition duration-300 bg-white h-full">
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 text-xs font-semibold text-[#126DFB] bg-white px-2 py-1 rounded">
          {blog.category}
        </span>
      </div>
      <div className="p-4">
        <h4 className="text-[15px] font-semibold text-[#032D60] leading-snug line-clamp-2 group-hover:text-[#126DFB] transition-colors">
          {blog.title}
        </h4>
        <p className="text-xs text-[#97989F] mt-2">{blog.date}</p>
      </div>
    </div>
  </Link>
)

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const blog = blogsData.blogs.find(b => b.slug === slug)
  const relatedBlogs = blogsData.blogs.filter(b => b.slug !== slug)
  useEffect(() => {
    document.title = blog ? `${blog.title} - BuilderTek` : 'Blog - BuilderTek'
  }, [blog])

  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [commentForm, setCommentForm] = useState({ comment: '', name: '', email: '' })
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Text variant="h3" color="primary">Blog post not found.</Text>
        <Link to="/blogs" className="btn-primary">Back to Blogs</Link>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleLeadSubmit = (e) => {
    e.preventDefault()
    setLeadSubmitted(true)
    setLeadForm({ name: '', email: '', phone: '', message: '' })
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    setCommentSubmitted(true)
    setCommentForm({ comment: '', name: '', email: '' })
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="sm:w-[85%] mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[#126DFB] text-sm font-medium hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            All Blogs
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

          {/* ── Main Content ───────────────────────────── */}
          <motion.main
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#032D60] leading-tight mb-5">
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 mb-7 pb-7 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag-primary text-xs">{blog.category}</span>
                <span className="flex items-center gap-1 text-sm text-[#97989F]">
                  <Calendar size={14} />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1 text-sm text-[#97989F]">
                  <Clock size={14} />
                  {blog.readTime}
                </span>
              </div>

              {/* Share */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Share:</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#F3F8FF] flex items-center justify-center text-[#126DFB] hover:bg-[#126DFB] hover:text-white transition"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#F3F8FF] flex items-center justify-center text-[#126DFB] hover:bg-[#126DFB] hover:text-white transition"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={15} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#F3F8FF] flex items-center justify-center text-[#126DFB] hover:bg-[#126DFB] hover:text-white transition"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#F3F8FF] flex items-center justify-center hover:bg-[#126DFB] hover:text-white transition"
                  aria-label="Share on WhatsApp"
                >
                  <Share2 size={15} className="text-[#126DFB] group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Hero image */}
            <motion.div
              className="w-full rounded-2xl overflow-hidden mb-8"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-h-[480px] object-cover"
              />
            </motion.div>

            {/* Blog content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContentRenderer content={blog.content} />
            </motion.div>

            {/* ── Comment Box ─────────────────────── */}
            <motion.div
              className="mt-14 border border-gray-200 rounded-2xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#032D60] mb-1">Leave a Reply</h3>
              <p className="text-sm text-gray-500 mb-6">
                Your email address will not be published. Required fields are marked <span className="text-[#126DFB]">*</span>
              </p>

              {commentSubmitted ? (
                <div className="bg-[#F3F8FF] rounded-xl p-5 text-center">
                  <p className="text-[#032D60] font-semibold text-base">Thank you for your comment!</p>
                  <p className="text-gray-500 text-sm mt-1">We'll review it shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleCommentSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#032D60] mb-1">
                      Comment <span className="text-[#126DFB]">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Write your comment..."
                      value={commentForm.comment}
                      onChange={e => setCommentForm(p => ({ ...p, comment: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#126DFB] resize-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#032D60] mb-1">
                        Name <span className="text-[#126DFB]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={commentForm.name}
                        onChange={e => setCommentForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#126DFB] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#032D60] mb-1">
                        Email <span className="text-[#126DFB]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Your email"
                        value={commentForm.email}
                        onChange={e => setCommentForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#126DFB] transition"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-2xl font-semibold text-white text-sm bg-gradient-to-r from-[#3785FF] to-[#1146F2] hover:opacity-90 transition"
                  >
                    Post Comment
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── Related / Latest Blogs Carousel ─────── */}
            <motion.div
              className="mt-14"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#032D60] mb-6">Latest Blogs</h3>

              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 }
                }}
                className="related-blogs-swiper pb-2"
              >
                {relatedBlogs.map(b => (
                  <SwiperSlide key={b.id}>
                    <RelatedBlogCard blog={b} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* All Blogs button */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold text-[#126DFB] border-2 border-[#126DFB] hover:bg-[#126DFB] hover:text-white transition"
              >
                <ArrowLeft size={16} />
                View All Blogs
              </Link>
            </div>
          </motion.main>

          {/* ── Sidebar ─────────────────────────────────── */}
          <motion.aside
            className="w-full lg:w-[320px] xl:w-[340px] shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* Lead Form */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #001A38 0%, #0A2D5E 50%, #126DFB 100%)' }}
              >
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-white mb-1">Schedule a Demo</h3>
                  <p className="text-sm text-blue-200 mb-5 leading-relaxed">
                    See BuilderTek in action. Fill out the form and our team will get in touch.
                  </p>

                  {leadSubmitted ? (
                    <div className="bg-white/10 rounded-xl p-5 text-center">
                      <p className="text-white font-semibold">Thank you!</p>
                      <p className="text-blue-200 text-sm mt-1">We'll be in touch shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-blue-200 mb-1">
                          Full Name <span className="text-[#7BBBFF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={leadForm.name}
                          onChange={e => setLeadForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-white/60 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-200 mb-1">
                          Email Address <span className="text-[#7BBBFF]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={leadForm.email}
                          onChange={e => setLeadForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-white/60 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-200 mb-1">
                          Phone Number <span className="text-[#7BBBFF]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 234 567 8900"
                          value={leadForm.phone}
                          onChange={e => setLeadForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-white/60 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-blue-200 mb-1">
                          Message <span className="text-blue-400 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="How can we help you?"
                          value={leadForm.message}
                          onChange={e => setLeadForm(p => ({ ...p, message: e.target.value }))}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-white/60 resize-none transition"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-[#126DFB] hover:bg-[#0d5fd8] transition mt-1"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Browse by Category */}
              <div className="bg-[#F7FAFF] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#032D60] mb-4">Browse by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {blogsData.categories.map(cat => (
                    <Link
                      key={cat}
                      to="/blogs"
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                        cat === blog.category
                          ? 'bg-[#126DFB] text-white'
                          : 'bg-white text-[#126DFB] border border-[#d1def5] hover:bg-[#126DFB] hover:text-white'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </motion.aside>

        </div>
      </div>
    </div>
  )
}

export default BlogPost
