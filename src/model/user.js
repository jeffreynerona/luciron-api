import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let User = new Schema({
	email: String,
	password: String
},{timestamps: true});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);