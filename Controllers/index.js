// Instance to be able to use Express router method
const router = require('express').Router();

// requiring the routes folder to know which routes to execute
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

// Creating the routes connection when using the application
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;