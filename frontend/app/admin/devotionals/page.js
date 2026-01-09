'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { devotionalAPI } from '@/lib/api'
import Cookies from 'js-cookie'

export default function AdminDevotionalsPage() {
  const router = useRouter()
  const [devotionals, setDevotionals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchDevotionals()
  }, [router])

  const fetchDevotionals = async () => {
    try {
      const response = await devotionalAPI.getAll()
      setDevotionals(response.data.data)
    } catch (err) {
      console.error('Error fetching devotionals:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this devotional?')) return

    try {
      await devotionalAPI.delete(id)
      fetchDevotionals()
    } catch (err) {
      alert('Error deleting devotional')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Devotionals</h1>
          <div className="flex gap-3">
            <button onClick={() => router.push('/admin')} className="btn btn-secondary">
              ← Back to Dashboard
            </button>
            <button onClick={() => router.push('/admin/devotionals/new')} className="btn btn-primary">
              + New Devotional
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scripture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {devotionals.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No devotionals yet. Create your first one!
                    </td>
                  </tr>
                ) : (
                  devotionals.map((devotional) => (
                    <tr key={devotional._id}>
                      <td className="px-6 py-4 font-medium">{devotional.title}</td>
                      <td className="px-6 py-4 text-sm">{devotional.scripture?.reference}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          devotional.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {devotional.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(devotional.devotionalDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/admin/devotionals/edit/${devotional._id}`)}
                            className="text-primary-600 hover:text-primary-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(devotional._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
