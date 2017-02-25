var twitter = {
	schema: {
		valid: {
			expectingType: 'object',							// The type, could be number, string, object, array
			expectingProperties: ['handle', 'tweet'],			// The properties of the object (not required for other types, maybe)
			places: [{
				operation: 'set',								// Should we overwrite (set) or add to the list (push) these?
				type: 'object',									// What are we saving? If object, we expect 'properties' and if not we are just saving the value
				path: '/userTweets/{{userHandle}}/{{key}}',	// Where should we put this? 
				variables: {									// We can use variables in handlebars that map our input data to the path
					userHandle: 'handle',						// This will place our input handle to userHandle in the path
					key: '$key'
				},	
				properties: ['tweet']							// We only want to duplicate the tweet, not the handle over
			},
			{
				operation: 'push',								// Should we overwrite (set) or add to the list (push) these?
				type: 'string',									// What are we saving? If object, we expect 'properties' and if not we are just saving the value
				path: '/usersWhoTweeted',						// Where should we put this? 
				variables: {},
				property: 'handle'
			},
			{
				operation: 'set',								// Should we overwrite (set) or add to the list (push) these?
				type: 'string',									// What are we saving? A string, so it will just be a value in the database with a key
				path: '/lastUser',								// Where should we put this? 
				variables: {},
				property: 'handle',
				options: {
					ignore: {
						delete: true
					}
				}
			}]
		},
		invalid: {
			expectingType: 'promise',							// The type, could be number, string, object, array
			expectingProperties: ['handle', 'tweet'],			// The properties of the object (not required for other types, maybe)
			places: [{
				operation: 'set',								// Should we overwrite (set) or add to the list (push) these?
				type: 'object',									// What are we saving? If object, we expect 'properties' and if not we are just saving the value
				path: '/userTweets/{{userHandle}}/{{key}}',	// Where should we put this? 
				variables: {									// We can use variables in handlebars that map our input data to the path
					userHandle: 'handle',						// This will place our input handle to userHandle in the path
					key: '$key'
				},	
				properties: ['tweet']							// We only want to duplicate the tweet, not the handle over
			},
			{
				operation: 'push',								// Should we overwrite (set) or add to the list (push) these?
				type: 'string',									// What are we saving? If object, we expect 'properties' and if not we are just saving the value
				path: '/usersWhoTweeted',						// Where should we put this? 
				variables: {},
				property: 'handle'
			},
			{
				operation: 'set',								// Should we overwrite (set) or add to the list (push) these?
				type: 'string',									// What are we saving? A string, so it will just be a value in the database with a key
				path: '/lastUser',								// Where should we put this? 
				variables: {},
				property: 'handle',
				options: {
					ignore: {
						delete: true
					}
				}
			}]
		}
	},
	data: {
		valid: [{
			handle: "test_user_1",
			tweet: "Wow hello this is my tweet, how cool is this"
		}],
		invalid: [{
			handle: "test_user_2"
		}]
	}
}

module.exports = {
	samples: {
		twitter: twitter
	}
};