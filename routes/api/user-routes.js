const router = require('express').Router();
const { getAllUsers, 
        createNewUser,
        updateUser,
        deleteUser } = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

router.route('/:user_id')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;