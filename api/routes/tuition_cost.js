'use strict';
const express = require('express');
const router = express.Router();
var tuition_cost = require('../controllers/tuition_cost');
router.get('/', tuition_cost.calculate_cost);
module.exports = router;