var	Config = require('./add.config.js');
var colors = require('colors');

var validateSchema = function(inputSchema) {
	var schemaValid = true;

	if(inputSchema.expectingType) {
		switch(inputSchema.expectingType) {
			case 'object':
				// Todo: Validate that it is has the other properties for validating an object
			break;

			case 'string':
				// Todo: Validate that it has the other neccessary properites 
			break;

			default:
				schemaValid = false;
				if(Config.logs.debug) console.log('Schema invalid: Invalid \'expectingType\': ' + inputSchema.expectingType);
			break;
		}
	}else{
		schemaValid = false;
		if(Config.logs.debug) console.log('Schema invalid: no \'expectingType\' found');
	}

	// TODO: More validation

	return schemaValid;
};

module.exports = {
	validateSchema: validateSchema
};