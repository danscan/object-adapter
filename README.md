object-adapter
==============

Function factory for mapping object values from old paths to new paths.

# Installation

`npm install --save object-adapter`

# Usage

```javascript
var Adapter = require('object-adapter');

var userAdapter = new Adapter({
  'objectId': 'oldData.objectId',
  'authData.hashedPassword': 'hashedPassword'
});

var oldUsers = [
  { objectId: '1a2b3c4d5e', authData: { hashedPassword: 'UAHIFGHeaifut72efg', sessionId: '5g6h7i8j9kl' } },
  { objectId: 'Yuvoad9UE9', authData: { hashedPassword: 'JKALDJGIj03iifhju3&', sessionId: '5g6h7i8j72h' } }
  ...
];

var newUsers = userAdapter(oldUsers);

async.each(newUsers, User.create, function(error) {
  if (error) console.error(error.stack);

  console.log('All new users created successfully.');
});
```
