const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { confirmation } = require('../controllers/confirmOrderController');


router.post('/confirm-order', confirmation);


module.exports = router;
