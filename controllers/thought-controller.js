const { Thought, User, Reaction } = require('../models');

const getUserThoughts = async (req, res) => {
    try {
        const username = req.params.username;
        const userThoughts = await Thought.find({ username: username})
        return res.status(200).json({userThoughts: userThoughts });
    } catch (err) {
        return res.status(500).json({ message: `Error getting user thoughts: ${err}` });
    }
};

const postUserThought = async (req, res) => {
    try {
        const username = req.params.username;
        // console.log(username);
        const newThought = await Thought.create(req.body);
        // console.log(newThought);
        const user = await User.findOneAndUpdate(
            { username: username },
            { $addToSet: { thoughts: newThought._id} },
            { new: true }
        );
        return res.status(200).json({ message: `Success`, newThought: newThought, user: user });
    } catch(err) {
        return res.status(500).json({ message: `Error psoting new thought: ${err}` });
    }
};

const getAllThoughts = async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        return res.status(200).json({ message: 'Success', allThoughts: allThoughts });
    } catch(err) {
        return res.status(500).json({ message: `Error getting all thoughts: ${err}`});
    }
}



module.exports = { getUserThoughts, postUserThought, getAllThoughts };
