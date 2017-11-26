import mongoose from 'mongoose';
import { Router } from 'express';
import Event from '../model/event';
import Attend from '../model/attend';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
	let api = Router();

	// 'v1/event/add'
	api.post('/add', authenticate, (req, res) => {
		let newEvent = new Event();
		newEvent.name = req.body.name;
		newEvent.description = req.body.description;
		newEvent.category = req.body.category;
		newEvent.location = req.body.location;
		newEvent.datetime = req.body.datetime;
		newEvent.image = req.body.image;

		newEvent.save(err => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Event saved successfully' });
		});
	});

	// '/v1/event/' - read
	api.get('/', (req,res) => {
		Event.find({}, (err, events) => {
			if (err) {
				res.send(err);
			}
			res.json(events);
		});
	});

	// '/v1/event/:id' - read 1
	api.get('/:id', (req, res) => {
		Event.findById(req.params.id, (err, event) => {
			if (err) {
				res.send(err);
			}
			res.json(event);
		});
	});

	// '/v1/event/:id' - update 1
	api.put('/:id', authenticate, (req,res) => {
		Event.findById(req.params.id, (err, event) => {
			if (err) {
				res.send(err);
			}
			event.name = req.body.name;
			event.save(err => {
				if (err) {
					res.send(err);
				}
				res.json({ message: "Event info updated" });
			});
		});
	});

	// '/v1/event/:id' - delete
	api.delete("/:id", authenticate, (req, res) => {
		Event.remove({
			_id: req.params.id
		},(err, event) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: "Event Deleted"});
		});
	});

	// '/v1/event/:id/add' attend
	api.post('/add/:id', authenticate, (req,res) => {
		Event.findById(req.params.id, (err, event) => {
			if (err) {
				res.send(err);
			}
			let newAttend = new Attend();

			newAttend.username = req.body.username;
			newAttend.event = event._id;
			newAttend.save((err, event) => {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'Attendee Saved!' });
			});
		});
	});

	return api;
}