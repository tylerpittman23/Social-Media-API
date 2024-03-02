const router = require('express').Router();
const { getAllUsers, 
        createNewUser,
        updateUser,
        deleteUser,
        getOneUser,
        addFriend, 
        removeFriend } = require('../../controllers/user-controller');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

router.route('/:user_id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:user_id/friends/:friend_id')
    .post(addFriend)
    .put(removeFriend)

module.exports = router;