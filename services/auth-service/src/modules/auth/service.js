const jwt = require('jsonwebtoken');
const User = require('./model');
const { AuthenticationError, ValidationError } = require('@platform/errors');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (userData) => {
  const newUser = await User.create(userData);
  const token = signToken(newUser._id);
  
  // Remove password from output
  newUser.password = undefined;
  
  return { token, user: newUser };
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new ValidationError('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AuthenticationError('Incorrect email or password');
  }

  const token = signToken(user._id);
  user.password = undefined;

  return { token, user };
};

module.exports = {
  register,
  login,
};
