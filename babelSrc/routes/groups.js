import express from 'express';
const router = express.Router();

import GroupController from '../controllers/group';

router.get('/find/:id', GroupController.findByShareId);
router.get('/all', GroupController.findMyGroups);
router.get('/group/:id', GroupController.findOneGroup);
router.post('/inviteToGroup/:id', GroupController.inviteToGroup)
router.post('/new', GroupController.createGroup);
router.post('/join', GroupController.joinGroupTwo);
router.post('/leave', GroupController.leaveGroup);
module.exports = router;
