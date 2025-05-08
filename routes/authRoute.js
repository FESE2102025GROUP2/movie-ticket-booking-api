// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const passport = require('passport');

// POST /auth/login
router.post('/login', authController.login);

// POST /auth/register
router.post('/register', authController.register);

// GET /auth/google
router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email'] // Add any other scopes you need
  })
);

// GET /auth/google/callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), // If authentication fails, redirect to home
  authController.googleLoginCallback // After successful authentication, call this function
);

module.exports = router;
