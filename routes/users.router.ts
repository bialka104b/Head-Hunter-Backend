import express = require('express');
import { UsersController } from '../controllers/users/users.controller';

const router = express.Router();

router
	.get('/', UsersController.getAllUsers)

export {
	router,
};
