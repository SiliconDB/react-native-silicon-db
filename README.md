Work in progress...

## Install

```
npm i react-native-silicon-db --save
```
or
```
yarn add react-native-silicon-db
```
Install peer dependecies:
```
yarn add @react-native-async-storage/async-storage
```
iOS
```
cd ios
pod install
```

## Example
```
import SiliconDB from 'react-native-silicon-db';

const db = new SiliconDB({database: 'demoName'});
const Users = await db.collection('users');

// listen Users changes
Users.onChange((ev) => {
      console.log('ev'); // insert/update/delete data
});

// insert object - return ID
const user1_id = await Users.insert({name: 'Maria', age: 20});

// return user object
let getUser = await Users.findById(user1_id);

// update user
await Users.update(user1_id, {age: 30});

// remove user
await Users.remove(user1_id);

// return array of users (objects) for age 30
const usersSearch = await Users.find({ age: 30 });

// Query Selectors
let usersQuery = await Users.query(
      {
        age: {
          $lte: 21,
        }
      },
);
/*
	Query Selectors
	$eq		Matches vals that are equal to a specified val.
	$gt		Matches vals that are greater than a specified val.
	$gte	Matches vals that are greater than or equal to a specified val.
	$in		Matches any of the vals specified in an array.
	$lt		Matches vals that are less than a specified val.
	$lte	Matches vals that are less than or equal to a specified val.
	$ne		Matches all vals that are not equal to a specified val.
	$nin	Matches none of the vals specified in an array.
*/

// delete collection
await Users.drop();

```
