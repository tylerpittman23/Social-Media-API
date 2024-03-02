const onFriendsList = (arr, val) => {
    return arr.some(friendId => friendId.toString() === val);
}

module.exports = onFriendsList;