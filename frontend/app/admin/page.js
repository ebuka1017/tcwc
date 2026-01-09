'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/blog')}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <p className="text-gray-600">Manage blog posts, create new articles, and edit existing content.</p>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/devotionals')}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Devotionals</h2>
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <p className="text-gray-600">Create and manage daily devotionals for your community.</p>
          </div>

          <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/categories')}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Categories</h2>
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
            </div>
            <p className="text-gray-600">Organize content with categories for blogs and devotionals.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
