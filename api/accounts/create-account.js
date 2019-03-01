const Accounts = require('../../models/accounts');

// Create and Save a new Account
module.exports = (req, res) => {
	const { email, name, age } = req.body;
	// Validate request
	if (!email) {
		return res.status(400).json({
			err: "Email can not be empty"
		});
	}

	// Create a Account
	const account = new Accounts({ email, name, age })

	// Save Account in the database
	account.save()
		.then(data => {
			res.status(200).json({ data, message: "Success" });
			res.json();
		}).catch(err => {
			err = err.message.includes('invalid email address') ? "invalid email address" : "email already exists"
			res.status(500).json({ err });
		});
};