import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../model/user';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({ config, db}) => {
	let api = Router();

	// '/v1/user/register'
	api.post('/register', (req, res) => {
		User.register(new User({ username: req.body.email }), req.body.password, (err, account) => {
			if (err) {
				res.send(err);
			}
			passport.authenticate(
				'local', {
					session: false
				})(req, res, () => {
					res.status(200).send('Successfully created new account');
				});
		});
	});

	// '/v1/user/login'
	api.post('/login', passport.authenticate(
		'local', {
			session: false,
			scope: []
		}), generateAccessToken, respond);

	// 'v1/user/logout'
	api.get('/logout', authenticate, (req, res) => {
		res.logout();
		res.status(200).send('Successfully logged out');
	});

	api.get('/me', authenticate, (req,res) => {
		res.status(200).json(req.user);
	});

	return api;
}