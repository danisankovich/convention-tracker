import express from 'express';
const router = express.Router();

import GroupController from '../controllers/group';

router.get('/find/:id', GroupController.findByShareId);
router.get('/all', GroupController.findMyGroups);
router.get('/group/:id', GroupController.findOneGroup);
router.post('/joingroup/:id', GroupController.joinGroup)
router.post('/new', GroupController.createGroup);

module.exports = router;
