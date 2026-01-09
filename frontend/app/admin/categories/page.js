'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { categoryAPI } from '@/lib/api'
import Cookies from 'js-cookie'

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'blog',
    description: ''
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchCategories()
  }, [router])

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      setCategories(response.data.data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (editingId) {
        await categoryAPI.update(editingId, formData)
      } else {
        await categoryAPI.create(formData)
      }

      setShowForm(false)
      setEditingId(null)
      setFormData({ name: '', type: 'blog', description: '' })
      fetchCategories()
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving category')
    }
  }

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      type: category.type,
      description: category.description || ''
    })
    setEditingId(category._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      await categoryAPI.delete(id)
      fetchCategories()
    } catch (err) {
      alert('Error deleting category')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', type: 'blog', description: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Categories</h1>
          <div className="flex gap-3">
            <button onClick={() => router.push('/admin')} className="btn btn-secondary">
              ← Back to Dashboard
            </button>
            <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
              {showForm ? 'Cancel' : '+ New Category'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="card p-6 mb-8 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Category' : 'Create New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="blog">Blog</option>
                  <option value="devotional">Devotional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card overflow-hidden">
              <div className="bg-gray-50 px-6 py-3">
                <h2 className="font-semibold">Blog Categories</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {categories.filter(cat => cat.type === 'blog').length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No blog categories yet
                  </div>
                ) : (
                  categories
                    .filter(cat => cat.type === 'blog')
                    .map((category) => (
                      <div key={category._id} className="px-6 py-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{category.name}</div>
                          {category.description && (
                            <div className="text-sm text-gray-500">{category.description}</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-primary-600 hover:text-primary-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="bg-gray-50 px-6 py-3">
                <h2 className="font-semibold">Devotional Categories</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {categories.filter(cat => cat.type === 'devotional').length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">
                    No devotional categories yet
                  </div>
                ) : (
                  categories
                    .filter(cat => cat.type === 'devotional')
                    .map((category) => (
                      <div key={category._id} className="px-6 py-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{category.name}</div>
                          {category.description && (
                            <div className="text-sm text-gray-500">{category.description}</div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-primary-600 hover:text-primary-800 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
