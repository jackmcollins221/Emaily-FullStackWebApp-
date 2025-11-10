const mongoose = require('mongoose');
const Schema = mongoose.Schema; //

const userSchema = new Schema({
    googleID: String
});

mongoose.model('users', userSchema); //tells mongoose to make a model called users using userschema