const onFriendsList = (arr, val) => {
    return arr.some(friendId => friendId.toString() === val);
}

const reactionExists = (arr, val) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id.toString().split('(')[0] === val) {
            return true
        }
    }
    return false;
}

module.exports = { onFriendsList, reactionExists };