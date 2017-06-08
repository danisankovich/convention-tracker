import express from 'express';
const router = express.Router();
import expressJwt from 'express-jwt';
import config from '../../config';
import jwt from 'jwt-simple';

import Authentication from '../controllers/authentication';
import passportService from '../services/passport';
import passport from 'passport';
import User from '../models/user';

const requireAuth = passport.authenticate('jwt', {session: false}); //token based, not session
const requireSignin = passport.authenticate('local', {session: false});
const authenticate = expressJwt({secret : config.secret});

router.get('/api', requireAuth, Authentication.getUser);
router.get('/api/checkUser', Authentication.checkUser);
router.put('/api/addfollower', requireAuth, Authentication.addFollower);
router.put('/api/removefollower', requireAuth, Authentication.removeFollower);
router.get('/api/user/:id', Authentication.getUserProfile);
router.post('/api/signup', Authentication.signup);
router.post('/api/signin', requireSignin, Authentication.signin);
router.post('/api/editInfo', Authentication.editInfo);

module.exports = router;
