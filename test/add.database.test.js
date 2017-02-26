var chai = require('chai');
var expect = chai.expect;
var Database = require('./../lib/index.js').Database;

var helpers = require('./test.helpers.js');

describe('Database (Firebase)', function() {
	// Existence
	
	it('should have all the correct functions', function() {
		expect(Database.push).to.exist;
		expect(Database.set).to.exist;
		expect(Database.delete).to.exist;
	});
});