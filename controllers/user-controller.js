const { User } = require('../models');

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        return res.status(200).json({ message: 'Success', users: users });
    } catch(err){
        return res.status(500).json({ message: `Error getting users: ${err}` });
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
        if (!user) {
            return res.status(400).json({ message: `No user found with specified id`});
        } else {
            await User.findOneAndDelete({ _id: user_id });
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
            await User.findOneAndUpdate({ _id: user_id }, req.body, { new: true });
            return res.status(200).json({ message: 'Successful upddating user', updatedUser: updateUser });
        }
    } catch(err) {
        return res.status(500).json({ message: `Error updating user: ${err}` });
    }
}

module.exports = { getAllUsers, createNewUser, deleteUser, updateUser };