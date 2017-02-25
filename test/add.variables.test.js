var chai = require('chai');
var expect = chai.expect;
var Variables = require('./../lib/index.js').Variables;

var helpers = require('./test.helpers.js');

describe('Variables', function() {
	// Values

	it('should should get the variable values for valid data', function() {
		var values = Variables.getVariableValues(helpers.samples.twitter.variables.valid[0].variables, helpers.samples.twitter.data.valid[0]);
		console.log('Values?');
		console.log(values);
		expect(values).to.eql(helpers.samples.twitter.variables.valid[0]._expectedVariables);
	});

	it('should should fail to get the variable values for invalid data', function() {
		var values = Variables.getVariableValues(helpers.samples.twitter.variables.valid[0].variables, helpers.samples.twitter.data.invalid[1]);
		console.log('Values?');
		console.log(values);
		expect(values).to.not.eql(helpers.samples.twitter.variables.valid[0]._expectedVariables);
	});

	it('should replace the variables in the path correctly', function() {
		var newPath = Variables.replaceVariablesInString(helpers.samples.twitter.variables.valid[0].path, helpers.samples.twitter.variables.valid[0]._expectedVariables);

		expect(newPath).to.equal(helpers.samples.twitter.variables.valid[0]._expectedPath);
	});
});