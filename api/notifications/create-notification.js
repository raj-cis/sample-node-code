const Notification = require('../../models/notifications');
const Account = require('../../models/account');

// Create and Save a new notification
module.exports = async (req, res) => {
	const { accountId, name, color } = req.body;
	// Validate request
	if (!accountId && !name && !color) {
		return res.status(400).json({
			err: "Required fields can not be empty"
		});
	}

	// Create a Account
	Account.findOne({ _id: accountId })
		.then(() => {
			const notification = new Notification({ accountId, name, color })
			// Save notification in the database
			notification.save()
				.then(data => {
					res.status(200).json({ data, message: "Success" });
				}).catch(err => {
					res.status(500).json({
						err: "Required fields can not be empty"
					});
				});
		}).catch(err => {
			res.status(500).json({
				err: "Invalid account ID"
			});
		});
};