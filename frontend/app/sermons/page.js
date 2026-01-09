'use client'

import { motion } from 'framer-motion'

export default function SermonsPage() {
  const sermons = [
    {
      id: 1,
      title: "The Power of Prayer",
      pastor: "Pastor William Green",
      date: "2024-01-07",
      series: "Building Your Faith",
      duration: "45 min"
    },
    {
      id: 2,
      title: "Living by Faith",
      pastor: "Pastor William Green",
      date: "2023-12-31",
      series: "Building Your Faith",
      duration: "42 min"
    },
    {
      id: 3,
      title: "The Grace of God",
      pastor: "Sarah Johnson",
      date: "2023-12-24",
      series: "Christmas Special",
      duration: "38 min"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermons</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch and listen to powerful messages that will strengthen your faith
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {sermons.map((sermon, index) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="card overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-80 aspect-video md:aspect-square bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                  </motion.button>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                      {sermon.series}
                    </span>
                    <span className="text-gray-500">
                      {new Date(sermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{sermon.duration}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{sermon.title}</h3>
                  <p className="text-gray-600 mb-4">{sermon.pastor}</p>

                  <div className="flex gap-3">
                    <button className="btn btn-primary">Watch Now</button>
                    <button className="btn btn-secondary">Download Audio</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
