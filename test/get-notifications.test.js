const chai = require('chai');
const app = require('../app');
const expect = chai.expect;

chai.use(require('chai-http'));
const Notifications = require('../models/notifications');
const Accounts = require('../models/accounts');
let notification, account, data = {};

before((done) => {
  account = new Accounts({
    email: 'testget@test.com',
    name: 'Testwo',
    age: 10
  })
  account.save()
    .then((data) => {
      account = data
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

describe('GET /notifications', () => {

  it('should be fail if request data is INVALID', (done) => {
    chai.request(app).get(`/notifications?accountId=test`)
      .then((res) => {
        expect(res).to.have.status(404);
        done();
      }).catch(() => {
        done();
      });
  });

  it('should be fail if request data is not-define', (done) => {
    chai.request(app).get(`/notifications`)
      .then((res) => {
        expect(res).to.have.status(404);
        done();
      }).catch(() => {
        done();
      });
  });

  it('should retrieve notification from the database', (done) => {
    chai.request(app).get(`/notifications?accountId=${notification.accountId}`)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.length).to.equals(1);
        expect(res.body.data[0].accountId).to.equals(notification.accountId);
        done();
      }).catch(() => {
        done();
      });
  });
});