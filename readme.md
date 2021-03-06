[![Build Status](https://travis-ci.org/NorthMcCormick/A-D-D.svg?branch=master)](https://travis-ci.org/NorthMcCormick/A-D-D) [![Coverage Status](https://coveralls.io/repos/github/NorthMcCormick/A-D-D/badge.svg?branch=master)](https://coveralls.io/github/NorthMcCormick/A-D-D?branch=master) <img src="http://www.northmccormick.com/content/images/2017/02/build-with-love@2x.png" height="20">

# Automatic Data Denormalizer

*Note: This is still in beta and is subject to change. PRs, suggestions, and issues are welcome.*

A-D-D for short, the automatic data denormalizer takes a developer defined schema and uses an input to duplicate the data.

## Changelog

#### 0.1.0

First release, yay! Basically this readme is everything in the first release.

## Feature Goals

### Handle update and remove

The initial version of the lib is built on the idea of adding data, updating and removing will come along and will be able to utilize the same schema that the add does.

### Complex objects

The first version of the lib will be able to handle the top most level properties on an object. Eventually better path parsing will be added so that you can reach into an object and select a nested property to use in the duplicated object.

### Functions for data

The ability to define a function for a property and perform a calculation on it. Maybe this function grabs other data first, does some validation, or alters the format of the data.

## Installation

NPM: `npm install a-d-d --save`

## Database Handlers

A-D-D allows you to write your own handlers for any database. You can even use the idea of the handler as a custom hook or extend them to do 

There is a template handler in the repo under `databaseHandlers`. There is also one for IonicDB and Firebase to get you started.

## Quick Start

Require the library into your node project:

```javascript
var ADDConfig			 	= require('a-d-d').Config;
var ADDDenormalizer 		= require('a-d-d').Denormalizer;
```

Load your databse handling object(s):

```javascript
var ADDDatabase_Firebase 	= require('./add.firebase.db.js');
var ADDDatabase_IonicDB 	= require('./add.ionicdb.db.js');
```

Create your databases and assign them to the config:

```javascript
var firebaseAdminDB 		= admin.database(); // From the Firebase Admin SDK
var ionicAdminDb 			= new IonicDB(db_settings); // From the Ionic SDK

var myFirebaseDatabase 		= new ADDDatabase_Firebase(firebaseAdminDB);
var myIonicDatabase 		= new ADDDatabase_IonicDB(ionicAdminDb);

ADDConfig.database.ionic 	= myIonicDatabase;
ADDConfig.database.default 	= myFirebaseDatabase;
```

Create a denormalizer object: 

```javascript
var tweetDenormalizer = new ADDDenormalizer({
	schema: {
		expectingType: 'object',
		expectingProperties: ['handle', 'tweet'],	
		places: [{
			operation: 'push',
			type: 'object',
			path: '/userTweets/{{userHandle}}',
			variables: 
				userHandle: 'handle'
			},
			properties: ['tweet']
		},
		{
			operation: 'push',
			type: 'string',
			path: '/usersWhoTweeted',
			variables: {},
			property: 'handle'
		},
		{
			operation: 'set',
			type: 'string',
			path: '/lastUser',
			variables: {},
			property: 'handle',
			options: {
				ignore: {
					delete: true // Ignore the request for delete
				}
			}
		},
		{
			operation: 'set',
			type: 'object',
			path: 'allTweets/{{key}}',
			variables: {
				userHandle: 'handle',
				key: '$key'
			},	
			properties: ['tweet'],
			options: {
				database: 'ionic' // Note, we set the database here. This will perform the operations on that db.
			}
		}]
	}
});
```

And ask it to denormalize some data for you:

```javascript
tweetDenormalizer.denormalize(newTweet).then(function(result) {
	console.log('Denormalized', result);

}, function(error) {
	console.error('Could not denormalize', error);

}).catch(function(e) {
	console.log('Exception');
	console.log(e);
});
```

## Denormalizer Object

The denormalizer is where the magic happens. You want to create one of these for each set of data you want to denormalize. In the Quick Start example I use tweets. When I send a tweet to the server that looks like this:

```json
{
  "handle": "Sammy_Yundt36",
  "tweet": "Wow hello this is my tweet, how cool is this"
}
```

It takes the data, validates that the schema matches, and then updates 3 places:

1. It pushes the tweet onto the user handle using a variable from the data
2. It adds their handle to a list of handles but just as a string, not as an object containing a string
3. It overwrites the node `lastUser` to their handle so we know who tweeted last

### Options

#### schema: Object *required*

`schema` holds the information for the input and output of your data. 

#### schema.expectingType: String *required*

`expectingType` is the type we expect to see. This keeps malformed data from clogging your denormalization process.

The available types are: `object`

#### schema.expectingProperties: Array<String> *required when `expectingType` is `object`*

An array of properties that the object *must* have to be denormalized. If the object is missing a property, it will not duplicate.

#### schema.places: Array<Object> *required*

An array of objects, each object describing where and how you want the data to be duplicated

#### schema.places.operation: String *required*

The type of operation to perform. The available operations are `set` and `push`.

#### schema.places.type: String *required*

What type you want to duplicate the data as. The avaiable types are `object` and `string`.

#### schema.places.properties: Array<String> *required if `type` is `object`*

An array of properties that you want to pull from the original data input. You must have at least one property to pull. The library does not support selecting nested properties at this time. If your object looks like this:

```json
{
	"a": {
		"aa": true,
		"bb": true
	},
	"b": {
		"cc": true
	}
}
```

And your properties looks like this:

```javascript
{
	properties: ['a']
}
```

The value it will duplicate is:

```javascript
{
	a: {
		aa: true,
		bb: true
	}
}
```

#### schema.places.property: String *required if `type` is `string`, `number`, or `boolean` and the input is an object*

The property from the object you want to use. This propety must be one of the above 3 types. It will fail if it is an object or an array.

If we have this as our original data:

```json
{
	"a": {
		"aa": true,
		"bb": true
	},
	"b": "I am a beautiful butterfly"
}
```

And our property looks like this:

```javascript
{
	property: 'b'
}
```

The value it will duplicate is:

```javascript
{
	b: 'I am a beautiful butterfly'
}
```

#### schema.places.path: String *required*

Where you want to save the new data. The path string can contain variable names (more on those below) and must be the absolute path.

Example: `/userTweets/{{userHandle}}` or `/users`

#### schema.places.variables: Object *required if a variable is defined in the path* 

`variables` is an object where the key is the name of the variable in the path and the value is the key of the original input.

Example:

```javascript
variables: {
	userHandle: 'handle'
}
```

`userHandle` is what it will search for in the path (like our previous path example). The parser will pull the value for `handle` (from the data we gave at the beginning of the denormalizer object) and use it there. 

Our data:

```json
{
  "handle": "Sammy_Yundt36",
  "tweet": "Wow hello this is my tweet, how cool is this"
}
```

What our final path will be:

`/userTweets/Sammy_Yundt36`

#### schema.places.options: Object

Places can have options to help handle their functions. If no options are provided, the default values will be used.

#### schema.places.options.ignore: Object

If you want to ignore a specific operation on a place, you can set that operation to `true` in the ignore object. 

Example: If we want to show what user last did something we want to update it but we do not want to delete the node even if the main object in the database was deleted. 

```javascript
{
	operation: 'set',
	type: 'string',
	path: '/lastUser',
	variables: {},
	property: 'handle',
	options: {
		ignore: {
			delete: true // We will update the node, but we will never delete it
		}
	}
}
```

#### schema.places.options.database: String

This is the string name of a previously configured database you would like to use. If nothing is defined it will use 'default'.

## Required Libraries

- Q
- Colors