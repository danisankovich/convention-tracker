import express from 'express';
const router = express.Router();

import GroupController from '../controllers/group';

router.get('/find/:id', GroupController.findByShareId);
router.post('/new', GroupController.createGroup);

module.exports = router;
