const express = require('express');
const router = new express.Router();
const CreateAccountApi = require('../api/accounts/create-account');

router.post('/create', CreateAccountApi);

module.exports = router;