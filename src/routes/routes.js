var router = require('express').Router();

//-- IMPORT AUTH ROUTES

// import normal auth
router.use(require('./auth/normal-auth/login'));
router.use(require('./auth/normal-auth/register'));

// import oauth
router.use(require('./auth/oauth/login-register-oauth'));

//--

//import views
router.use(require('./app/planner'));
router.use(require('./app/daily'));
router.use(require('./app/dashboard'));
router.use(require('./index'));

//setup
router.use(require('./app/setup'));

module.exports = router;