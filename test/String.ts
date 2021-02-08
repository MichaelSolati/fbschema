import * as chai from 'chai';

import {firestore} from './common';

const expect = chai.expect;
const collection = firestore.collection('StringCollection');

describe('String Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `string`', () => {
      return collection
        .add({
          simple: '123456',
        })
        .then(() => expect(true).to.be.true);
    });
    it('Does not accept property of type other than `string`', () => {
      return collection
        .add({
          simple: 1,
        })
        .catch(() => expect(true).to.be.true);
    });
    it('Accepts string of length of 3 when `minLength` set to 3', () => {
      return collection
        .add({
          minLength: '123',
        })
        .then(() => expect(true).to.be.true);
    });
    it('Does not accept string of length of 2 when `minLength` set to 3', () => {
      return collection
        .add({
          minLength: '12',
        })
        .catch(() => expect(true).to.be.true);
    });
    it('Accepts string of length of 10 when `maxLength` set to 10', () => {
      return collection
        .add({
          maxLength: '1234567890',
        })
        .then(() => expect(true).to.be.true);
    });
    it('Does not accept string of length of 11 when `maxLength` set to 10', () => {
      return collection
        .add({
          maxLength: '12345678901',
        })
        .catch(() => expect(true).to.be.true);
    });
    it('Accepts string of accepted enum value', () => {
      return collection
        .add({
          enum: '1',
        })
        .then(() => expect(true).to.be.true);
    });
    it('Does not accept string of unaccepted enum value', () => {
      return collection
        .add({
          enum: '4',
        })
        .catch(() => expect(true).to.be.true);
    });
  });
});
