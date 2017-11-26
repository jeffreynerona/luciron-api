import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

var RateLimit = require('express-rate-limit');

let app = express();
app.server = http.createServer(app);

// middleware
// limiter
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
 
var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 1000, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});
 
//  apply to all requests 
app.use(limiter);

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