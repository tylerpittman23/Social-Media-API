const router = require('express').Router();
const userRoutes = require('./api/user-routes');
const thoughtRoutes = require('./api/thought-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;