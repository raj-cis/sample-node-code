const Notification = require('../../models/notifications');

// Create and Save a new Account
module.exports = (req, res) => {
	const { accountId, color } = req.query
	Notification.deleteMany({ accountId, color })
		.then((data) => {
			if (data.deletedCount < 1) {
				res.status(400).json({ message: "failed" });
			}
			else {
				res.status(200).json({ message: "Success" });
			}
		}).catch(err => {
			res.status(500).json({
				message: err.message || "Some error occurred while deleting notifications."
			});
		});
}