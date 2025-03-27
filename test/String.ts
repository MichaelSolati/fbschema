import * as chai from 'chai';
import {collection, addDoc} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'StringCollection');

describe('String Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `string`', () => {
      return addDoc(collectionRef, {
        simple: '123456',
      }).then(() => expect(true).to.be.true);
    });
    it('Does not accept property of type other than `string`', () => {
      return addDoc(collectionRef, {
        simple: 1,
      }).catch(() => expect(true).to.be.true);
    });
    it('Accepts string of length of 3 when `minLength` set to 3', () => {
      return addDoc(collectionRef, {
        minLength: '123',
      }).then(() => expect(true).to.be.true);
    });
    it('Does not accept string of length of 2 when `minLength` set to 3', () => {
      return addDoc(collectionRef, {
        minLength: '12',
      }).catch(() => expect(true).to.be.true);
    });
    it('Accepts string of length of 10 when `maxLength` set to 10', () => {
      return addDoc(collectionRef, {
        maxLength: '1234567890',
      }).then(() => expect(true).to.be.true);
    });
    it('Does not accept string of length of 11 when `maxLength` set to 10', () => {
      return addDoc(collectionRef, {
        maxLength: '12345678901',
      }).catch(() => expect(true).to.be.true);
    });
    it('Accepts string of accepted enum value', () => {
      return addDoc(collectionRef, {
        enum: '1',
      }).then(() => expect(true).to.be.true);
    });
    it('Does not accept string of unaccepted enum value', () => {
      return addDoc(collectionRef, {
        enum: '4',
      }).catch(() => expect(true).to.be.true);
    });
  });
});
