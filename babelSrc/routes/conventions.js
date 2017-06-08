import express from 'express';
const router = express.Router();

import Convention from '../models/convention';
import User from '../models/user';
import ConventionController from '../controllers/convention';

router.get('/convention/:id', ConventionController.findOneConvention);
router.get('/all', ConventionController.findAllConventions);
router.post('/myconventions', ConventionController.findMyConventions);
router.post('/new', ConventionController.newConvention);
router.post('/editConvention', ConventionController.editConvention);
router.delete('/deleteConvention/:id', ConventionController.removeConventionFromMyList);
router.post('/joinConvention/:id', ConventionController.joinConvention);
module.exports = router;
