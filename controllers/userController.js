const User = require('../model/User');
const bcrypt = require('bcrypt');
const { errorResponse, successResponse } = require('../utils/utilities');


const registerUser = async (req, res, next) => {

  try {
    // 1. retrive data from body
    const { name, email, password } = req.body;

    // check user email is exist or not
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return errorResponse(res, "User is already exist! Try to login", 400);
    }

    // lets make the password hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a user
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    // save this user to collection in db
    const savedUser = await newUser.save();

    // send a response back to user
    successResponse(res, "User created successfully", 201, savedUser);

  } catch (err) {
    errorResponse(res, "Something went wrong with registration", 400);
  }
};

const loginUser = async (req, res, next) => {

  try {
    // Retriving user email and password from req.body
    const { email, password } = req.body;

    // check email is correct or not
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      return errorResponse(res, "Email wrong!", 400);
    }

    // check password is correct or not
    const isValidPassword = await bcrypt.compare(password, existUser.password);
    if (!isValidPassword) {
      return errorResponse(res, "password wrong!", 400);
    }

    // create a token for this user

    const data = await User.findOne({ email: email }).select('name email -_id');

    // send back a response and login the user
    successResponse(res, "Login successfully", 200, data);

  } catch (err) {
    errorResponse(res, "Something went wrong with login", 400);
  }
};

const getUser = async (req, res, next) => {
  try {
    // retriving the from url parameter
    const { id } = req.params;

    // lets find the user with corresponding id
    const user = await User.findById({ _id: id })
      .select('name email');

    // send back a response and login the user
    successResponse(res, "success", 200, user);
  } catch (err) {
    errorResponse(res, "Something went wrong in getting user data", 400);
  }
};
const updateUser = async (req, res, next) => {
  successResponse(res, "success", 200);
};
const deleteUser = async (req, res, next) => {
  successResponse(res, "success", 200);
};

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser };