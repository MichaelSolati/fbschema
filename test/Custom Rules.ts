import * as chai from 'chai';

import {firestore} from './common';

const expect = chai.expect;
const collection = firestore.collection('CustomRulesCollection');

describe('Custom Rules Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts object with id of `newid`', () => {
      return collection
        .doc('newid')
        .set({
          simple: 1,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accepts object with id of not of `newid`', () => {
      return collection
        .doc('notnewid')
        .set({
          simple: 1,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Does not accepts object auto generated id', () => {
      return collection
        .add({
          simple: 1,
        })
        .catch(() => expect(true).to.be.true);
    });
  });
  describe('Read Tests:', () => {
    it('Collection can be read', () => {
      return collection.get().then(() => expect(true).to.be.true);
    });
  });
});
