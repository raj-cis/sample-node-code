const chai = require('chai');
const app = require('../app');
const expect = chai.expect;

chai.use(require('chai-http'));
const Notifications = require('../models/notifications');
const Accounts = require('../models/accounts');
let res, notification, account, data = {};

before((done) => {
  Accounts.deleteMany()
  account = new Accounts({
    email: 'testdelete@test.com',
    name: 'Testwo',
    age: 10
  })
  account.save()
    .then(() => {
      notification = new Notifications({
        accountId: account._id,
        name: 'notification-test-name',
        color: 'notification-test-color'
      });
      notification.save()
        .then((data) => {
          notification = data
          done();
        }).catch(() => {
          done();
        });
    }).catch(() => {
      done();
    });
});

after((done) => {
  Accounts.deleteMany()
    .then(() => {
      Notifications.deleteMany()
        .then(() => {
          done();
        }).catch(() => {
          done();
        });
    }).catch(() => {
      done();
    });
});

describe('DELETE /notifications', () => {

  it('should be fail if data is INVALID', (done) => {
    chai.request(app).delete(`/notifications?accountId=test&color=test`)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      }).catch(() => {
        done();
      });
  });

  it('should be fail if accountId is not-define', (done) => {
    chai.request(app).delete(`/notifications?&color=test`)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      }).catch(() => {
        done();
      });
  });

  it('should be fail if color is not-define', (done) => {
    chai.request(app).delete(`/notifications?accountId=test`)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      }).catch(() => {
        done();
      });
  });

  it('should be delete notification from database', (done) => {
    chai.request(app).delete(`/notifications?accountId=${notification.accountId}&color=${notification.color}`)
      .then(() => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      }).catch(() => {
        done();
      });
  });
});