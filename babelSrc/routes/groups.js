import express from 'express';
const router = express.Router();

import GroupController from '../controllers/group';

router.get('/find/:id', GroupController.findByShareId);
router.get('/all', GroupController.findMyGroups);
router.post('/new', GroupController.createGroup);

module.exports = router;
