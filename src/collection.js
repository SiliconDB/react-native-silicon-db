/* eslint-disable eqeqeq */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import _ from 'lodash';
import { generateID, isArray, isObject, queryMatch } from './functions';

export default class Collection {
  constructor(db, name, data) {
    this.name = name;
    this.db = db;
    this.data = data || [];
    this.collectionKey = this.db + '/' + this.name;
    this.onChange = (callback) =>
      DeviceEventEmitter.addListener(this.collectionKey, callback);
  }

  insert = async (value) => {
    if (isObject(value)) {
      if (!value.id) value.id = generateID();
      this.data.unshift(value);
      console.log(this.data);
      await this.storeData(this.data);
      DeviceEventEmitter.emit(this.collectionKey, {
        type: 'insert',
        data: value,
      });
      return value.id;
    } else if (isArray(value)) {
      //handle array
    } else {
      throw new Error('Type error');
    }
  };

  update = async (id, obj) => {
    if (isObject(obj) && id) {
      const getObj = await this.findById(id);
      const newObj = Object.assign(getObj, obj);
      let newData = await this._del(id);
      newData.unshift(newObj);
      this.data = newData;
      await this.storeData(this.data);
      DeviceEventEmitter.emit(this.collectionKey, {
        type: 'update',
        data: newObj,
      });
      console.log(this.data);
    } else {
      throw new Error('Missing parameters');
    }
  };

  getAll = () => {
    return this.data;
  };

  query = (query) => {
    return _.filter(this.data, function (o) {
      return queryMatch(query, o);
    });
    //ex
    // let users = await this.Users.query(
    //   {
    //     varsta: {
    //       $lte: 21,
    //     },
    //   }
    // );
    // console.log(users);
  };

  find = async (obj) => {
    if (isObject(obj)) {
      return _.filter(this.data, obj);
    } else {
      throw new Error('Not an object !');
    }
  };

  findById = async (id) => {
    if (id) {
      return _.find(this.data, { id: id });
    } else {
      throw new Error('No id!');
    }
  };

  remove = async (id) => {
    if (id) {
      this.data = _.filter(this.data, function (o) {
        return o.id != id;
      });
      await this.storeData(this.data);
      DeviceEventEmitter.emit(this.collectionKey, { type: 'remove', data: id });
      return this.data;
    } else {
      throw new Error('No id!');
    }
  };

  _del = async (id) => {
    if (id) {
      this.data = _.filter(this.data, function (o) {
        return o.id != id;
      });
      return this.data;
    } else {
      throw new Error('No id!');
    }
  };

  drop = async () => {
    this.data = [];
    await AsyncStorage.removeItem(this.collectionKey);
  };

  storeData = async (val) => {
    try {
      await AsyncStorage.setItem(this.collectionKey, JSON.stringify(val));
    } catch (e) {
      console.log(e);
    }
  };
}
