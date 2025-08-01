import * as chai from 'chai';
import {collection, addDoc} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'StringCollections');

describe('String Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `string`', async () => {
      await addDoc(collectionRef, {
        simple: '123456',
      });
      expect(true).to.be.true;
    });
    it('Does not accept property of type other than `string`', async () => {
      try {
        await addDoc(collectionRef, {
          simple: 1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
    it('Accepts string of length of 3 when `minLength` set to 3', async () => {
      await addDoc(collectionRef, {
        minLength: '123',
      });
      expect(true).to.be.true;
    });
    it('Does not accept string of length of 2 when `minLength` set to 3', async () => {
      try {
        await addDoc(collectionRef, {
          minLength: '12',
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
    it('Accepts string of length of 10 when `maxLength` set to 10', async () => {
      await addDoc(collectionRef, {
        maxLength: '1234567890',
      });
      expect(true).to.be.true;
    });
    it('Does not accept string of length of 11 when `maxLength` set to 10', async () => {
      try {
        await addDoc(collectionRef, {
          maxLength: '12345678901',
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
    it('Accepts string of accepted enum value', async () => {
      await addDoc(collectionRef, {
        enum: '1',
      });
      expect(true).to.be.true;
    });
    it('Does not accept string of unaccepted enum value', async () => {
      try {
        await addDoc(collectionRef, {
          enum: '4',
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
  });
});
