const { Thought, User, Reaction } = require('../models');
const { reactionExists}  = require('../utils/helpers');

const getOneThought = async (req, res) => {
    try {
        const thought_id = req.params.thought_id;
        const thought = await Thought.find({ _id: thought_id});
        if (!thought || thought.length === 0) {
            return res.status(400).json({ message: 'No thought found with that id' });
        } 
        return res.status(200).json({ thought: thought });
    } catch (err) {
        return res.status(500).json({ message: `Error getting user thoughts: ${err}` });
    }
};

const getAllThoughts = async (req, res) => {
    try {
        const allThoughts = await Thought.find({})
        return res.status(200).json({ message: 'Success', allThoughts: allThoughts });
    } catch(err) {
        return res.status(500).json({ message: `Error getting all thoughts: ${err}`});
    }
}

const postUserThought = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findOne({ _id: user_id });
        
        if(!user) {
            return res.status(400).json({ message: 'No user found with specified id' });
        }

        const thoughtData = {
            ...req.body,
            username: user.username
        };

        const newThought = await Thought.create(thoughtData);

        await User.findOneAndUpdate(
            { _id: user_id },
            { $addToSet: { thoughts: newThought._id} },
            { new: true }
        );

        return res.status(200).json({ message: `Success`, newThought: newThought });
    } catch(err) {
        return res.status(500).json({ message: `Error psoting new thought: ${err}` });
    }
};

const updateThought = async (req, res) => {
    try {
        const thought_id = req.params.thought_id;
        const updatedThought = await Thought.findByIdAndUpdate(
            {_id: thought_id },
            req.body,
            { new: true }, 
        );
        return res.status(200).json({ message: 'Success', updatedThought: updatedThought });
    } catch(err) {
        return res.status(500).json({ message: `Error updating thought: ${err}` });
    }
};

const deleteThought = async (req, res) => {
    try {
        const thought_id = req.params.thought_id;
        if (!thought_id) {
            return res.status(400).json({ message: `No thought found with that id` });
        }
        const thought = await Thought.findById(thought_id);
        console.log(thought);
        await User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: thought_id }}
        );

        await Thought.findByIdAndDelete(thought_id);

        return res.status(200).json({ message: 'Success' });
    } catch(err) {
        return res.status(500).json({ message: `Error deleting thought: ${err}` });
    }
};

const addReaction = async (req, res) => {
    try {
        const thought_id = req.params.thought_id;
        const user_id = req.params.user_id;

        const user = await User.findById(user_id);
        const thought  = await Thought.findById(thought_id);
        if (!thought || !user) {
            return res.status(400).json({ message: 'No thought or user found with specified id '});
        }

        const newReaction= {
            reactionBody: req.body.reactionBody,
            username: user.username,
        };

        const updatedThought = await Thought.findByIdAndUpdate(
            { _id: thought_id },
            { $push: { reactions: newReaction} },
            { new: true }
        );

        return res.status(200).json({ message: 'Success', updatedThought: updatedThought})
    } catch(err) {
        return res.status(500).json({ message: `Error adding reaction: ${err}` });
    }
}

const deleteReaction = async (req, res) => {
    try {
        const reaction_id = req.params.reaction_id;
        const thought_id = req.params.thought_id;

        const thought = await Thought.findById(thought_id);
        const reactionsArray = thought.reactions;

        if (reactionExists(reactionsArray, reaction_id)) {
            const removedReaction = await Thought.findByIdAndUpdate(
                { _id: thought_id },
                { $pull: { reactions: { _id: reaction_id }}},
                { new: true },
            );
            return res.status(200).json({ message: 'Success', removedReaction: removedReaction});

        } else {
            return res.status(400).json({ message: 'No reaction found with specified id' });
        }

    } catch(err) {
        return res.status(500).json({ message: `Error deleting reaction: ${err}` });
    }
}

module.exports = { getOneThought, 
                   postUserThought, 
                   getAllThoughts, 
                   updateThought, 
                   deleteThought, 
                   addReaction,
                   deleteReaction };
