const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
	accountId: { type: String, required: true },
	name: { type: String, required: true },
	color: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notifications', NotificationSchema);