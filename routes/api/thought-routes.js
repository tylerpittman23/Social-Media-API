const router = require('express').Router();
const { getOneThought, 
        postUserThought, 
        getAllThoughts, 
        updateThought, 
        deleteThought,
        addReaction,
        deleteReaction } = require('../../controllers/thought-controller');

router.route('/:user_id')
    .post(postUserThought);

router.route('/')
    .get(getAllThoughts)

router.route('/:thought_id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thought_id/reactions/:user_id')
    .post(addReaction)

router.route('/:thought_id/reactions/:reaction_id')
    .delete(deleteReaction);

module.exports = router;