import express = require('express');
import { UsersController } from '../controllers/users.controller';

const router = express.Router();

router
	.get('/', UsersController.getAllUsers)
	.get('/trainees-list', UsersController.getAllListedTrainees);

export {
	router,
};
