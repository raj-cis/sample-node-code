const express = require('express');
const router = new express.Router();
const CreateNotification = require('../api/notifications/create-notification');
const GetNotifications = require('../api/notifications/get-notification');
const DeleteNotification = require('../api/notifications/delete-notification');

router.post('/', CreateNotification);
router.get('/', GetNotifications);
router.delete('/', DeleteNotification);

module.exports = router;