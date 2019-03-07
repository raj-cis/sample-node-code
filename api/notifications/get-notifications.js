const Notifications = require('../../models/notifications');

// Create and Save a new Accounts
module.exports = (req, res) => {
  const { accountId } = req.query

  Notifications.find({ accountId })
    .then(notifications => {
      if (notifications.length > 0) {
        return res.status(200).json({ data: notifications, message: "Success" });
      } else {
        return res.status(404).json({ message: "No data found for account id " + accountId });
      }
    }).catch(err => {
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving notifications."
      });
    });
};