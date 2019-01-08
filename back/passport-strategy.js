const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = require('passport-jwt');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { jwtSecret, dbHandle } = require('./conf');
