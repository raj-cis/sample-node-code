const Notifications = require('../../models/notifications');

// Create and Save a new Accounts
module.exports = (req, res) => {
	const { accountId, color } = req.query
	Notifications.deleteMany({ accountId, color })
		.then((data) => {
			if (data.deletedCount < 1) {
				return res.status(400).json({ message: "failed" });
			}
			else {
				return res.status(200).json({ message: "Success" });
			}
		}).catch(err => {
			return res.status(500).json({
				message: err.message || "Some error occurred while deleting notifications."
			});
		});
}