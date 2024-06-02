const express = require('express');
const { searchMovies } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/search', protect, searchMovies);

module.exports = router;
