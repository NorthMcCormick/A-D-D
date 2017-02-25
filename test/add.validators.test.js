var chai = require('chai');
var expect = chai.expect;
var Validators = require('./../lib/index.js').Validators;

var helpers = require('./test.helpers.js');

describe('Validators', function() {

	// Schema
	it('should validate valid schema', function() {
		expect(Validators.validateSchema(helpers.validSchema)).to.equal(true);
	});

	it('should fail to validate with invalid schema', function() {
		expect(Validators.validateSchema(helpers.invalidSchema)).to.equal(false);
	});
});