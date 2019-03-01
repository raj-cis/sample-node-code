const Notification = require('../../models/notifications');

// Create and Save a new Account
module.exports = (req, res) => {
	const { accountId } = req.query

	Notification.find({ accountId })
		.then(notifications => {
			if (notifications.length > 0) {
				res.status(200).json({ data: notifications, message: "Success" });
			} else {
				res.status(404).json({ message: "No data found for account id " + accountId });
			}
		}).catch(err => {
			res.status(500).json({
				message: err.message || "Some error occurred while retrieving notifications."
			});
		});
};