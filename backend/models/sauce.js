const mongoose  = require('mongoose');

const Sauce = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: "number", required: true},
    likes: {type: "number", required: true},
    dislikes: {type: "number", required: true},
    usersLiked: {type: Array, required: true},
    usersDisliked: {type: Array, required: true}
})

module.exports = mongoose.model('Sauce', Sauce);