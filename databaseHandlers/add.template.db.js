var Q = require('q');

var vm = {
	db: null
};

var Config = {
	logs: {
		debug: true
	}
}

function Database(ref) {
	vm.db = ref;
}

// Push: Pushing an object, number, or string onto an array/collection of items with no specific ID
Database.prototype.push = function(path, data) {
	if(Config.logs.debug) console.log('Attempting push with ----');
	if(Config.logs.debug) console.log(path);
	if(Config.logs.debug) console.log(data);

	return Q.promise(function(resolve, reject) {
		if(vm.db !== null) {
			// Do your DB call and resolve/reject
		}else{
			reject('Null DB');
		}
	});
};

// Set: Set the data at a specific path and overwrite the data that is there
Database.prototype.set = function(path, data) {
	if(Config.logs.debug) console.log('Attempting set with ----');
	if(Config.logs.debug) console.log(path);
	if(Config.logs.debug) console.log(data);

	return Q.promise(function(resolve, reject) {
		if(vm.db !== null) {
			// Do your DB call and resolve/reject
		}else{
			reject('Null DB');
		}
	});
};

// Delete: Delete or remove the data at a specific path
Database.prototype.delete = function(path) {
	if(Config.logs.debug) console.log('Attempting delete with ----');
	if(Config.logs.debug) console.log(path);

	return Q.promise(function(resolve, reject) {
		if(vm.db !== null) {
			// Do your DB call and resolve/reject
		}else{
			reject('Null DB');
		}
	});
};

module.exports = Database;