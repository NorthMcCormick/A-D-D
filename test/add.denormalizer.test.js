var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var Denormalizer = require('./../lib/index.js').Denormalizer;

var helpers = require('./test.helpers.js');

describe('Denormalizer', function() {

	// Constructing
	it('should construct with valid schema', function() {
		var denormalizer = new Denormalizer({
			schema: helpers.validSchema
		});

		expect(denormalizer.isConstructed()).to.equal(true);
	});

	it('should fail to construct with invalid schema', function() {
		var denormalizer = new Denormalizer({
			schema: helpers.invalidSchema
		});

		expect(denormalizer.isConstructed()).to.equal(false);
	});
});