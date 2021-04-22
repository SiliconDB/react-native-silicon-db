'use strict'

import Collection from './collection';
import { checkCollection } from './functions';


export default class SiliconDB {
  constructor(config) {
    this.db = config.database;
    this.encryption = config.encryption || false;
    this.data = [];
  }

  collection = async (name) => {
    console.log("coll");
    this.data = await checkCollection(this.db, name);
    return new Collection(this.db, name, this.data);
  };
}

