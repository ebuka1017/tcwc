'use client'

import { motion } from 'framer-motion'

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Sunday Worship Service",
      date: "2024-01-14",
      time: "10:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      description: "Join us for our weekly worship service featuring powerful praise, worship, and biblical teaching.",
      type: "Worship"
    },
    {
      id: 2,
      title: "Bible Study",
      date: "2024-01-17",
      time: "7:00 PM - 8:30 PM",
      location: "Fellowship Hall",
      description: "Dive deeper into God's Word with fellow believers. This week: The Book of Romans.",
      type: "Study"
    },
    {
      id: 3,
      title: "Youth Night",
      date: "2024-01-19",
      time: "6:30 PM - 9:00 PM",
      location: "Youth Center",
      description: "Fun, fellowship, and faith for our youth. Games, worship, and relevant Bible teaching.",
      type: "Youth"
    },
    {
      id: 4,
      title: "Community Outreach",
      date: "2024-01-21",
      time: "9:00 AM - 2:00 PM",
      location: "Downtown Community Center",
      description: "Serve our community with food distribution and prayer ministry.",
      type: "Outreach"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join us for fellowship, worship, and spiritual growth
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="card p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-32 flex-shrink-0">
                  <div className="bg-primary-600 text-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-sm uppercase">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full uppercase">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

                  <div className="space-y-2 text-gray-600 mb-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
