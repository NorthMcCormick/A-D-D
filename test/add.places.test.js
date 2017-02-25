var chai = require('chai');
var expect = chai.expect;
var Places = require('./../lib/index.js').Places;

var helpers = require('./test.helpers.js');

describe('Places', function() {

	// Init
	it('should init with valid places schema', function() {
		expect(Places.initPlaces(helpers.samples.twitter.schema.valid.places, helpers.samples.twitter.data.valid[0])).to.not.equal(false);
	});

	it('should not init invalid places schema', function() {
		expect(Places.initPlaces(helpers.samples.twitter.schema.invalid.places, helpers.samples.twitter.data.valid[0])).to.not.equal(false);
	});
});