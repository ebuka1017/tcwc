'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPreview() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">About Our Ministry</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Word of Grace Ministries was birthed from prayer in Ghana in 1996, with a divine promise:
              "I will get the work started and keep the work going." What started in a living room with five members
              has grown into a thriving ministry touching lives across Nigeria and beyond.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Under the leadership of Rev. Goodwill Adogho, we are committed to our five-pillar mandate:
              raising armies of worshipers, putting smiles on the face of mankind, developing leaders after God's order,
              making dreams come true, and creating wealth for God's people.
            </p>
            <Link href="/about" className="btn btn-primary">
              Learn More About Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">28+</div>
              <div className="text-gray-600">Years of Ministry</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">1996</div>
              <div className="text-gray-600">Founded</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">1000</div>
              <div className="text-gray-600">Seater Building</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-gray-600">Core Pillars</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
