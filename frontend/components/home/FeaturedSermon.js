'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FeaturedSermon() {
  // This would fetch from API in production
  const sermon = {
    title: "The Power of Prayer",
    pastor: "Pastor William Green",
    date: "2024-01-07",
    excerpt: "Discover the transformative power of prayer and how it can change your life and strengthen your relationship with God.",
    thumbnail: "https://via.placeholder.com/800x450"
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">Latest Sermon</h2>
          <p className="section-subtitle text-gray-300">Watch our most recent message</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="aspect-video bg-gray-700 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </motion.button>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <span>{sermon.pastor}</span>
                <span>•</span>
                <span>{new Date(sermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              <h3 className="text-2xl font-bold mb-4">{sermon.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{sermon.excerpt}</p>

              <Link href="/sermons" className="btn btn-primary">
                View All Sermons
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
