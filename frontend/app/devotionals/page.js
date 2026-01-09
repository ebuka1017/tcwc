'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DevotionalsPage() {
  // This would fetch from API in production
  const devotionals = [
    {
      id: 1,
      title: "Walking in Faith",
      scripture: { reference: "Hebrews 11:1", text: "Now faith is confidence in what we hope for..." },
      date: "2024-01-09",
      slug: "walking-in-faith"
    },
    {
      id: 2,
      title: "The Lord is My Shepherd",
      scripture: { reference: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
      date: "2024-01-08",
      slug: "lord-my-shepherd"
    },
    {
      id: 3,
      title: "God's Unfailing Love",
      scripture: { reference: "Psalm 136:1", text: "Give thanks to the Lord, for he is good..." },
      date: "2024-01-07",
      slug: "gods-unfailing-love"
    },
  ]

  return (
    <div className="py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Daily Devotionals</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Daily spiritual nourishment for your walk with Christ
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {devotionals.map((devotional, index) => (
            <motion.div
              key={devotional.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <Link href={`/devotionals/${devotional.slug}`} className="card p-6 block border-l-4 border-primary-600 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                    {new Date(devotional.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                  {devotional.title}
                </h3>

                <div className="bg-primary-50 p-4 rounded-lg mb-4 border-l-4 border-primary-400">
                  <p className="text-sm font-semibold text-primary-700 mb-1">{devotional.scripture.reference}</p>
                  <p className="text-gray-700 italic text-sm">{devotional.scripture.text}</p>
                </div>

                <span className="text-primary-600 font-medium group-hover:underline">
                  Read Full Devotional →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
