const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { jwtSecret, dbHandle, saltRounds } = require('./conf');

const router = express.Router();
