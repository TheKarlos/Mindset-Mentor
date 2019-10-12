var router = require('express').Router();

//-- IMPORT AUTH ROUTES

// import normal auth
router.use(require('./auth/normal-auth/login'));
router.use(require('./auth/normal-auth/register'));

// import oauth
router.use(require('./auth/oauth/login-register-oauth'));

//--

module.exports = router;