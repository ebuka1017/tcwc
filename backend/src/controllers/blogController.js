const BlogPost = require('../models/BlogPost');

// @desc    Get all blog posts
// @route   GET /api/v1/blog
// @access  Public
exports.getBlogPosts = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by status (default to published for public)
    if (status) {
      query.status = status;
    } else if (!req.user) {
      query.status = 'published';
    }

    // Filter by category
    if (category) {
      query.categories = category;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const blogPosts = await BlogPost.find(query)
      .populate('author', 'name email')
      .populate('categories', 'name slug')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await BlogPost.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogPosts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: blogPosts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post
// @route   GET /api/v1/blog/:slug
// @access  Public
exports.getBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug })
      .populate('author', 'name email')
      .populate('categories', 'name slug');

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    blogPost.views += 1;
    await blogPost.save();

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/v1/blog
// @access  Private
exports.createBlogPost = async (req, res, next) => {
  try {
    // Add user as author
    req.body.author = req.user.id;

    const blogPost = await BlogPost.create(req.body);

    res.status(201).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/v1/blog/:id
// @access  Private
exports.updateBlogPost = async (req, res, next) => {
  try {
    let blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check ownership (admin can edit all)
    if (blogPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog post'
      });
    }

    blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/v1/blog/:id
// @access  Private
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check ownership (admin can delete all)
    if (blogPost.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog post'
      });
    }

    await blogPost.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
