const express = require('express');
const router = express.Router();
const { getStudentScores } = require('../controllers/studentRankingController');

router.get('/rankings', getStudentScores);

module.exports = router;
