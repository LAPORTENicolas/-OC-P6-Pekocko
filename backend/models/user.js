const mongoose      = require('mongoose');
const uniqueId      = require('mongoose-unique-validator');

const userSchema    = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.plugin(uniqueId);

module.exports      = mongoose.model('User', userSchema);