import express from 'express';
import { json } from 'body-parser';
import userController from '../controllers/user.controller';
import verifyJwt from '../middlewares/verifyJwt';
import isOwner from '../middlewares/isOwner';

const router = express.Router();

router.post('/', json(), userController.create);
router.post('/auth', json(), userController.auth);
router.get('/', userController.getAll);
router.get('/:id', [verifyJwt, isOwner], userController.get);

export default router;
