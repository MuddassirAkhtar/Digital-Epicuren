const express = require('express');

const authController = require('../controllers/auth.controller')
const { auth, isPartner, isowner } = require('../middlewares/auth')
const router = express.Router();

// user routes 
router.post('/register', authController.registerUser )

router.post('/login', authController.login)

router.get('/logout', auth , authController.logoutUser)


// foodpartener  routes

router.post('/foodpartener/register', authController.registerPartener) 

// router.post('/foodpartener/login', authController.loginPartener)

router.get('/foodpartener/logout', auth,  authController.logoutPartener)


// /me route 

router.get('/me', auth, authController.getMe)

module.exports = router