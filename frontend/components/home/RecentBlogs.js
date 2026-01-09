'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

export default function RecentBlogs() {
  // This would fetch from API in production
  const blogs = [
    {
      id: 1,
      title: "5 Ways to Strengthen Your Prayer Life",
      excerpt: "Prayer is the foundation of our relationship with God. Here are five practical ways to deepen your prayer life.",
      author: "Pastor William",
      date: "2024-01-05",
      category: "Spiritual Growth",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 2,
      title: "Understanding Biblical Grace",
      excerpt: "Grace is more than just a theological concept - it's the very foundation of our salvation and daily walk with Christ.",
      author: "Sarah Johnson",
      date: "2024-01-03",
      category: "Theology",
      image: "https://via.placeholder.com/400x250"
    },
    {
      id: 3,
      title: "Walking in Faith During Difficult Times",
      excerpt: "When life gets hard, our faith can falter. Learn how to maintain trust in God during life's storms.",
      author: "Elder Mark",
      date: "2024-01-01",
      category: "Faith",
      image: "https://via.placeholder.com/400x350"
    }
  ]

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Recent Blog Posts</h2>
          <p className="section-subtitle">Insights and inspiration from our ministry</p>
        </motion.div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="mb-6"
            >
              <Link href={`/blog/${blog.id}`} className="card block group">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{blog.author}</span>
                    <span className="text-primary-600 font-medium group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Masonry>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/blog" className="btn btn-primary">
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
