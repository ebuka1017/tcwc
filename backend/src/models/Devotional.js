const mongoose = require('mongoose');

const devotionalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  scripture: {
    reference: {
      type: String,
      required: [true, 'Please provide scripture reference'],
      trim: true
    },
    text: {
      type: String,
      trim: true
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    trim: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  devotionalDate: {
    type: Date,
    required: [true, 'Please provide devotional date'],
    unique: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  metaTitle: {
    type: String,
    maxlength: [70, 'Meta title cannot be more than 70 characters']
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot be more than 160 characters']
  }
}, {
  timestamps: true
});

// Create slug from title before saving
devotionalSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Index for better query performance
devotionalSchema.index({ slug: 1 });
devotionalSchema.index({ devotionalDate: -1 });
devotionalSchema.index({ status: 1, devotionalDate: -1 });

module.exports = mongoose.model('Devotional', devotionalSchema);
