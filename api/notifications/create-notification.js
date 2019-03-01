const Notifications = require('../../models/notifications');
const Accounts = require('../../models/accounts');

// Create and Save a new notification
module.exports = async (req, res, done) => {
	const { accountId, name, color } = req.body;
	// Validate request
	if (!accountId && !name && !color) {
		return res.status(400).json({
			err: "Required fields can not be empty"
		});
	}

	// Create a Accounts
	Accounts.findOne({ _id: accountId })
		.then(() => {
			Notifications.find({ accountId: accountId, color })
				.then((data) => {
					if (data.length < 1) {
						const notification = new Notifications({ accountId, name, color })
						notification.save()
							.then(data => {
								return res.status(200).json({ data, message: "Success" });
							}
							).catch(err => {
								return res.status(500).json({
									err: "Required fields can not be empty"
								});
							});
					}
					else {
						return res.status(500).json({ message: "color already exist for account id " + accountId });
					}
				}).catch(() => {
					done();
				});
		}).catch(err => {
			res.status(500).json({
				err: "Invalid account ID"
			});
		});
};