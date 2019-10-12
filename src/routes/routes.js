var router = require('express').Router();

//-- IMPORT AUTH ROUTES

// import normal auth
router.use(require('./auth/normal-auth/login'));
router.use(require('./auth/normal-auth/register'));

// import oauth
router.use(require('./auth/oauth/login-register-oauth'));


//import views
router.use(require('./view-routes/planner'));
router.use(require('./view-routes/recommendations/daily'));
router.use(require('./view-routes/recommendations/overall'));


//--

module.exports = router;