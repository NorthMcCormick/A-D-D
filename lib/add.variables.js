var getVariableValues = function(variables, data) {
	Object.keys(variables).forEach(function(variableKey) {
		if(data[variables[variableKey]] !== undefined) {
			variables[variableKey] = data[variables[variableKey]];
		}
	});

	return variables;
};

var replaceVariablesInString = function(string, variables) {
	Object.keys(variables).forEach(function(variable) {
		string = string.replace('{{' + variable + '}}', variables[variable]);
		string = string.replace('{{ ' + variable + ' }}', variables[variable]);
	});

	return string;
};

var getValueToDuplicate = function(place, data) {
	var newValue = null;

	switch(place.type) {
		case 'object':
			newValue = {};

			place.properties.forEach(function(property) {
				if(data[property] !== undefined) {
					newValue[property] = data[property];
				}
			});
		break;

		case 'string':
			if(place.property) {
				newValue = data[place.property];
			}else{
				newValue = data;
			}
		break;

		case 'number':
			if(place.property) {
				newValue = data[place.property];
			}else{
				newValue = data;
			}
		break;

		case 'boolean':
			if(place.property) {
				newValue = data[place.property];
			}else{
				newValue = data;
			}
		break;

		default:
			console.log('Could not denormalize data. Place is trying to use an undefined type: ' + place.type);
		break;
	}

	return newValue;
};

module.exports = {
	getVariableValues: getVariableValues,
	replaceVariablesInString: replaceVariablesInString,
	getValueToDuplicate: getValueToDuplicate
};