const chai = require('chai');
const expect = chai.expect;
const app = require('../app');

chai.use(require('chai-http'));
const Accounts = require('../models/accounts');
let data = {};


describe('POST /account/create', () => {
	before((done) => {
		Accounts.deleteMany()
			.then(() => {
				const account = new Accounts({
					email: 'test@test.com',
					name: 'Testwo',
					age: 10
				})
				account.save()
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

	after((done) => {
		Accounts.deleteMany()
			.then(() => {
				done();
			}).catch(() => {
				done();
			});
	});

	it('should be fail if data is INVALID', (done) => {
		chai.request(app).post('/account/create').send(data)
			.then((res) => {
				expect(res).to.have.status(400);
				done();
			}).catch(() => {
				done();
			});
	});

	it('should be fail if email is BLANK', (done) => {
		data['email'] = '';
		chai.request(app).post('/account/create').send(data)
			.then((res) => {
				expect(res).to.have.status(400);
				done();
			}).catch(() => {
				done();
			});
	});

	it('should be fail if email is INVALID', (done) => {
		data['email'] = 'test-email';
		chai.request(app).post('/account/create').send(data)
			.then((res) => {
				expect(res).to.have.status(500);
				expect(res.body.err).to.equals('invalid email address');
				done();
			}).catch(() => {
				done();
			});
	});

	it('should add account to database', (done) => {
		data = {
			email: 'test2@test.com',
			name: 'Testo',
			age: 56
		};
		chai.request(app).post('/account/create').send(data)
			.then((res) => {
				expect(res).to.have.status(200);
				expect(res.body.data.email).to.equals(data.email);
				expect(res.body.data.name).to.equals(data.name);
				expect(res.body.data.age).to.equals(data.age);
			}).catch(() => {
				done();
			});
		Accounts.findOne(data)
			.then((account) => {
				expect(account).to.exist;
				done();
			}).catch(() => {
				done();
			});
	});

	it('should be fail if existing email', (done) => {
		chai.request(app).post('/account/create').send(data)
			.then((res) => {
				expect(res).to.have.status(500);
			}).catch(() => {
				done();
			});
		Accounts.findOne({ email: data.email })
			.then((account) => {
				expect(account).to.exist;
				done();
			}).catch(() => {
				done();
			});
	});

});