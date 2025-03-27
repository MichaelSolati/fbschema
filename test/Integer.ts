import * as chai from 'chai';
import {collection, addDoc} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'IntegerCollection');

describe('Integer Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `integer`', () => {
      return addDoc(collectionRef, {
        simple: 1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept property of type other than `integer`', () => {
      return addDoc(collectionRef, {
        simple: '1',
      }).catch(() => expect(true).to.be.true);
    });

    it('Does not accept property of type `number`', () => {
      return addDoc(collectionRef, {
        simple: 0.1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 3 when `minimum` set to 3', () => {
      return addDoc(collectionRef, {
        minimum: 3,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 2 when `minimum` set to 3', () => {
      return addDoc(collectionRef, {
        minimum: 2,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 4 when `exclusiveMinimum` set to 3', () => {
      return addDoc(collectionRef, {
        exclusiveMinimum: 4,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 3 when `exclusiveMinimum` set to 3', () => {
      return addDoc(collectionRef, {
        exclusiveMinimum: 3,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 10 when `maximum` set to 10', () => {
      return addDoc(collectionRef, {
        maximum: 10,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 11 when `maximum` set to 10', () => {
      return addDoc(collectionRef, {
        maximum: 11,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 9 when `exclusiveMaximum` set to 10', () => {
      return addDoc(collectionRef, {
        exclusiveMaximum: 9,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 10 when `exclusiveMaximum` set to 10', () => {
      return addDoc(collectionRef, {
        exclusiveMaximum: 10,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 100 when `multipleOf` set to 10', () => {
      return addDoc(collectionRef, {
        multipleOf: 100,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 101 when `multipleOf` set to 10', () => {
      return addDoc(collectionRef, {
        multipleOf: 101,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 50 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return addDoc(collectionRef, {
        range: 50,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of -1 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return addDoc(collectionRef, {
        range: -1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 101 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return addDoc(collectionRef, {
        range: 101,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of accepted enum value', () => {
      return addDoc(collectionRef, {
        enum: 1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of unaccepted enum value', () => {
      return addDoc(collectionRef, {
        enum: 4,
      }).catch(() => expect(true).to.be.true);
    });
  });
});
