import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

let app = express();
app.server = http.createServer(app);

// middleware
// parese application/json
app.use(bodyParser.json({
	limit: config.bodyLimit
}));
// passport config
app.use(passport.initialize());
let User = require('./model/user');
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	User.authenticate()
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// api routes v1
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`started the magic on port ${app.server.address().port}`);

export default app;