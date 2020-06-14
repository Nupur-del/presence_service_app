const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    uid : Number,
    name: String,
    gender: Number,
    email: { type : String,
             unique : true,
           },
    password: String,
});

module.exports = mongoose.model('user', UserSchema);