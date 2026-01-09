const Devotional = require('../models/Devotional');

// @desc    Get all devotionals
// @route   GET /api/v1/devotionals
// @access  Public
exports.getDevotionals = async (req, res, next) => {
  try {
    const { status, category, page = 1, limit = 10, date } = req.query;

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

    // Filter by date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.devotionalDate = { $gte: startDate, $lt: endDate };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const devotionals = await Devotional.find(query)
      .populate('author', 'name email')
      .populate('categories', 'name slug')
      .sort({ devotionalDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Devotional.countDocuments(query);

    res.status(200).json({
      success: true,
      count: devotionals.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: devotionals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single devotional
// @route   GET /api/v1/devotionals/:slug
// @access  Public
exports.getDevotional = async (req, res, next) => {
  try {
    const devotional = await Devotional.findOne({ slug: req.params.slug })
      .populate('author', 'name email')
      .populate('categories', 'name slug');

    if (!devotional) {
      return res.status(404).json({
        success: false,
        message: 'Devotional not found'
      });
    }

    // Increment views
    devotional.views += 1;
    await devotional.save();

    res.status(200).json({
      success: true,
      data: devotional
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's devotional
// @route   GET /api/v1/devotionals/today
// @access  Public
exports.getTodayDevotional = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const devotional = await Devotional.findOne({
      status: 'published',
      devotionalDate: { $gte: today, $lt: tomorrow }
    })
      .populate('author', 'name email')
      .populate('categories', 'name slug');

    if (!devotional) {
      return res.status(404).json({
        success: false,
        message: 'No devotional found for today'
      });
    }

    res.status(200).json({
      success: true,
      data: devotional
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create devotional
// @route   POST /api/v1/devotionals
// @access  Private
exports.createDevotional = async (req, res, next) => {
  try {
    // Add user as author
    req.body.author = req.user.id;

    const devotional = await Devotional.create(req.body);

    res.status(201).json({
      success: true,
      data: devotional
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update devotional
// @route   PUT /api/v1/devotionals/:id
// @access  Private
exports.updateDevotional = async (req, res, next) => {
  try {
    let devotional = await Devotional.findById(req.params.id);

    if (!devotional) {
      return res.status(404).json({
        success: false,
        message: 'Devotional not found'
      });
    }

    // Check ownership (admin can edit all)
    if (devotional.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this devotional'
      });
    }

    devotional = await Devotional.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: devotional
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete devotional
// @route   DELETE /api/v1/devotionals/:id
// @access  Private
exports.deleteDevotional = async (req, res, next) => {
  try {
    const devotional = await Devotional.findById(req.params.id);

    if (!devotional) {
      return res.status(404).json({
        success: false,
        message: 'Devotional not found'
      });
    }

    // Check ownership (admin can delete all)
    if (devotional.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this devotional'
      });
    }

    await devotional.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
