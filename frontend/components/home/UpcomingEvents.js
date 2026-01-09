'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function UpcomingEvents() {
  // This would fetch from API in production
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "2024-01-14",
      time: "10:00 AM",
      location: "Main Sanctuary",
      type: "Worship"
    },
    {
      id: 2,
      title: "Bible Study",
      date: "2024-01-17",
      time: "7:00 PM",
      location: "Fellowship Hall",
      type: "Study"
    },
    {
      id: 3,
      title: "Youth Night",
      date: "2024-01-19",
      time: "6:30 PM",
      location: "Youth Center",
      type: "Youth"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">Join us for fellowship and worship</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                  {event.type}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-600 uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-3">{event.title}</h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {event.time}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/events" className="btn btn-primary">
            View All Events
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
