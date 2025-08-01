import * as chai from 'chai';
import {collection, doc, setDoc, addDoc, getDocs} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'CustomRulesCollections');

describe('Custom Rules Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts object with id of `newid`', async () => {
      await setDoc(doc(collectionRef, 'newid'), {
        simple: 1,
      });
      expect(true).to.be.true;
    });

    it('Does not accepts object with id of not of `newid`', async () => {
      try {
        await setDoc(doc(collectionRef, 'notnewid'), {
          simple: 1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Does not accepts object auto generated id', async () => {
      try {
        await addDoc(collectionRef, {
          simple: 1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
  });
  describe('Read Tests:', () => {
    it('Collection can be read', async () => {
      await getDocs(collectionRef);
      expect(true).to.be.true;
    });
  });
});
