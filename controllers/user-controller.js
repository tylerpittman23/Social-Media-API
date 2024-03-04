const { User, Thought } = require('../models');
const { onFriendsList } = require('../utils/helpers');

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.status(200).json({ message: 'Success', users: users });
    } catch(err){
        return res.status(500).json({ message: `Error getting users: ${err}` });
    }
}

const getOneUser = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const user = await User.findOne({ _id: user_id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' });
        if (!user) {
            return res.status(400).json({ message: 'No user found with specified id' });
        } else {
            return res.status(200).json({ message: 'Success', user: user });
        }
    } catch(err) {
        return res.status(500).json({ message: `Error getting single user: ${err}`});
    }
}

const createNewUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        return res.status(200).json({ messsage: 'Success', newUser: newUser });
    } catch(err) {
        return res.status(500).json({ message: `Error creating user: ${err}` });
    }
}

const deleteUser = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const user = await User.findOne({ _id: user_id });
        console.log('user to delete', user);
        if (!user) {
            return res.status(400).json({ message: `No user found with specified id`});
        } else {
            await User.updateMany(
                { $pull: { friends: { _id: user_id }}}
            );

            await Thought.deleteMany(user.username);

            return res.status(200).json({ message: 'Successful deletion' });
        }
    } catch(err) {
        return res.status(500).json({ message: `Error deleting user: ${err}` });
    }
}

const updateUser = async (req, res) => {
    try{
        const user_id = req.params.user_id;
        const user = await User.findOne({ _id: user_id });
        if (!user) {
            return res.status(400).json({ message: `No user found with specified id`});
        } else {
            await User.findOneAndUpdate(
                { _id: user_id },
                req.body,
                { new: true });
            return res.status(200).json({ message: 'Successful upddating user', updatedUser: updateUser });
        }
    } catch(err) {
        return res.status(500).json({ message: `Error updating user: ${err}` });
    }
}

const addFriend = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const friend_id = req.params.friend_id;

        const friend = await User.findById(friend_id);
        if (!friend) {
            return res.status(400).json({ message: 'No user found with specified friend_id' });
        }

        const user = await User.findByIdAndUpdate(
            { _id: user_id },
            { $addToSet: { friends: friend_id }},
            { new: true }
        )

        return res.status(200).json({ message: 'Success', user: user });
    } catch (err) {
        return res.status(500).json({ message: `Error adding friend: ${err}` });
    }
};

const removeFriend = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const friend_id = req.params.friend_id;

        const user = await User.findById(user_id);
        console.log(user);

        if (onFriendsList(user.friends, friend_id)) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: user_id },
                { $pull: { friends: friend_id }},
                { new: true },
            );
            return res.status(200).json({ message: 'Success', updatedUser: updatedUser });
        } else {
            return res.status(400).json({ message: 'Friend does not exist on friends list '});
        }
    } catch (err) {
        return res.status(500).json({ message: `Error removing friend: ${err}` });
    }
}

module.exports = { getAllUsers, createNewUser, deleteUser, updateUser, getOneUser, addFriend, removeFriend };