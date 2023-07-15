const express = require('express');
const userController = require('../controllers/userController');

// Create a router with express
const router = express.Router();

router.route('/register')
  .post(userController.registerUser);

router.route('/login')
  .post(userController.loginUser);

router.route('/user/:id')
  .get(userController.getUser);

router.route('/user/:id')
  .patch(userController.updateUser);

router.route('/user/:id')
  .delete(userController.deleteUser);

module.exports = router;