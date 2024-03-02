const router = require('express').Router();
const { getUserThoughts, postUserThought, getAllThoughts } = require('../../controllers/thought-controller');

router.route('/:username')
    .get(getUserThoughts)
    .post(postUserThought);

router.route('/')
    .get(getAllThoughts)

module.exports = router;