const chai = require('chai');
const app = require('../app');
const expect = chai.expect;

chai.use(require('chai-http'));
const Notifications = require('../models/notifications');
const Accounts = require('../models/accounts');
let res, account, data = {};

before((done) => {
  account = new Accounts({
    email: 'testcreate@test.com',
    name: 'Testwo',
    age: 10
  })
  account.save()
    .then((data) => {
      account = data
      done();
    }).catch(() => {
      done();
    });
});

after((done) => {
  Accounts.deleteMany()
    .then(() => {
      Notifications.deleteMany()
        .then((data) => {
          account = data
          done();
        }).catch(err => {
          done();
        });
    }).catch(() => {
      done();
    });
});

describe('POST /notifications', () => {

  it('should be fail if data is INVALID', (done) => {
    chai.request(app).post('/notifications').send(data)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      }).catch(() => {
        done();
      });
  });

  it('should be fail if data is BLANK', (done) => {
    data = {
      accountId: '',
      name: '',
      color: ''
    };
    chai.request(app).post('/notifications').send(data)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      }).catch((err) => {
        done();
      });
  });

  it('should add notification to database', (done) => {
    data = {
      accountId: account._id,
      name: 'test-2',
      color: 'test-2'
    };
    Notifications.findOne(data)
      .then(() => {
        chai.request(app).post('/notifications').send(data)
          .then((res) => {
            expect(res.body.data.accountId).to.equals(data.accountId.toString());
            expect(res.body.data.name).to.equals(data.name);
            expect(res.body.data.color).to.equals(data.color);
            Notifications.findOne(data)
              .then(() => {
                expect(res).to.have.status(200);
                done();
              }).catch(() => {
                done();
              });
          }).catch(() => {
            done();
          });
      }).catch(() => {
        done();
      });
  });

  it('should be add mulitple notification for same account', (done) => {
    data = {
      accountId: account._id,
      name: 'test-3',
      color: 'test-3'
    };
    chai.request(app).post('/notifications').send(data)
      .then(() => {
        expect(res).to.have.status(200);
        expect(res.body.data.color).to.equals(data.color);
        expect(res.body.data.accountId).to.equals(data.accountId.toString());
        expect(res.body.data.name).to.equals(data.name);
        Notifications.findOne(data)
          .then((notification) => {
            expect(notification).to.exist;
            done();
          }).catch(() => {
            done();
          });
      }).catch(() => {
        done();
      });
  });

  it('should be fail if add mulitple notifications for same account and same color', (done) => {
    data = {
      accountId: account._id,
      name: 'test-3',
      color: 'test-3'
    };
    chai.request(app).post('/notifications').send(data)
      .then(() => {
        expect(res).to.have.status(500);
      }).catch(() => {
        done();
      });
  });
});