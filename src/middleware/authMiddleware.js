import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import Event from '../model/event';

const TOKENTIME = 2592000;
const SECRET = "all 1z w3lL";

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
	req.token = req.token || {};
	req.token = jwt.sign({
		id: req.user.id,
	}, SECRET, {
		expiresIn: TOKENTIME
	});
	next();
}

let ownerAuth = function (eventId) {
	return (req, res, next) => {
		const user = req.user;
		Event.findById(eventId), (err, foundEvent) => {
			if (err) {
				res.status(422).json({ error: 'No event was found.' });
				return next(err);
			}
			if (foundEvent.userId == user._id) {
				return next();
			}
			return res.status(401).json({ error: 'Not Authorized.' });
		};
	};
};

let respond = (req, res) => {
	res.status(200).json({
		user: req.user.username,
		token: req.token
	});
}

module.exports = {
	authenticate,
	generateAccessToken,
	respond
}