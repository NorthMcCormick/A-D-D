var chai = require('chai');
var expect = chai.expect;
var Validators = require('./../lib/index.js').Validators;

var helpers = require('./test.helpers.js');

describe('Validators', function() {

	// Schema
	it('should validate valid schema', function() {
		expect(Validators.validateSchema(helpers.samples.twitter.schema.valid)).to.equal(true);
	});

	it('should fail to validate with invalid schema', function() {
		expect(Validators.validateSchema(helpers.samples.twitter.schema.invalid)).to.equal(false);
	});

	// Places
	it('should validate all places', function() {
		expect(Validators.validatePlace(helpers.samples.twitter.schema.valid.places[0])).to.equal(true);
	});
});