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
              WG Ministries was founded with a vision to spread the Gospel and nurture spiritual growth in believers.
              Our mission is to create a community where faith is strengthened, lives are transformed, and God's
              love is shared with all.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Through powerful sermons, daily devotionals, and community outreach, we seek to fulfill the
              Great Commission and make disciples of all nations.
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
              <div className="text-4xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-gray-600">Years Serving</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Sermons</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Members</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Reached</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
