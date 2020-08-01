const express = require('express');
const router = express.Router();
const newsFeedControllers = require('../controllers/newsFeedControllers');

router.post('/', newsFeedControllers.saveNewsItems);
router.get('/', newsFeedControllers.getNewsItems);


module.exports = router;
