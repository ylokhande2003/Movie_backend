const express = require('express');
const { createList, getLists, getListById, addMovieToList } = require('../controllers/listController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createList)
    .get(protect, getLists)
    .put(protect,addMovieToList);

router.route('/getmoviebyid/:id').get(protect,getListById);



module.exports = router;
