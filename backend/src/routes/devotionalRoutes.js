const express = require('express');
const {
  getDevotionals,
  getDevotional,
  getTodayDevotional,
  createDevotional,
  updateDevotional,
  deleteDevotional
} = require('../controllers/devotionalController');
const { protect } = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validation');

const router = express.Router();

router.get('/today', getTodayDevotional);

router
  .route('/')
  .get(getDevotionals)
  .post(protect, validate(schemas.devotional), createDevotional);

router
  .route('/:slug')
  .get(getDevotional);

router
  .route('/id/:id')
  .put(protect, updateDevotional)
  .delete(protect, deleteDevotional);

module.exports = router;
