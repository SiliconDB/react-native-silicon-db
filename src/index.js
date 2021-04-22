'use strict'

import Collection from './collection';
import { checkCollection } from './functions';
// import _ from 'lodash';
// var RNFS = require('react-native-fs');


export default class SiliconDB {
  constructor(config) {
    this.db = config.database;
    this.encryption = config.encryption || false;
    this.data = [];
    // console.log("init", _.VERSION);
    var path = RNFS.DocumentDirectoryPath + '/test.txt';

    // write the file
//     RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
//       .then((success) => {
//         console.log('FILE WRITTEN!');
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
  }

  collection = async (name) => {
    console.log("coll");
    this.data = await checkCollection(this.db, name);
    return new Collection(this.db, name, this.data);
  };
}

