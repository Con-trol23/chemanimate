﻿const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/changepassword', changePassword);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function changePassword(req, res, next) {
    userService.changePassword(req.body)
        .then(msg => msg ? res.json({ message: msg }) : res.status(400).json({ message: 'Username or password is incorrect' }) )
        .catch(err => next(err));
}
