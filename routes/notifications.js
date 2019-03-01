const express = require('express');
const router = new express.Router();
const CreateNotification = require('../api/notifications/create-notification');
const GetNotifications = require('../api/notifications/get-notifications');
const DeleteNotification = require('../api/notifications/delete-notifications');

router.post('/', CreateNotification);
router.get('/', GetNotifications);
router.delete('/', DeleteNotification);

module.exports = router;