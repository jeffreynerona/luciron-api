import mongoose from 'mongoose';
import Event from './event';
let Schema = mongoose.Schema;

let AttendSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	event: {
		type: Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	}
});

module.exports = mongoose.model('Attend', AttendSchema);