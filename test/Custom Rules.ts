import * as chai from 'chai';
import {collection, doc, setDoc, addDoc, getDocs} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'CustomRulesCollection');

describe('Custom Rules Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts object with id of `newid`', () => {
      return setDoc(doc(collectionRef, 'newid'), {
        simple: 1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accepts object with id of not of `newid`', () => {
      return setDoc(doc(collectionRef, 'notnewid'), {
        simple: 1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Does not accepts object auto generated id', () => {
      return addDoc(collectionRef, {
        simple: 1,
      }).catch(() => expect(true).to.be.true);
    });
  });
  describe('Read Tests:', () => {
    it('Collection can be read', () => {
      return getDocs(collectionRef).then(() => expect(true).to.be.true);
    });
  });
});
