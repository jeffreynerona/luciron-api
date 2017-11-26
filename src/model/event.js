import mongoose from 'mongoose';
import Attend from './attend';
let Schema = mongoose.Schema;

let eventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	datetime: {
		type: String,
		required: true
	},
	image: {
		type: String
	}
});

module.exports = mongoose.model('Event', eventSchema);