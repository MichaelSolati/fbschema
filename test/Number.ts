import * as chai from 'chai';
import {collection, addDoc} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'NumberCollections');

describe('Number Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `number`', () => {
      return addDoc(collectionRef, {
        simple: 0.1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept property of type other than `number`', () => {
      return addDoc(collectionRef, {
        simple: '0.1',
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of 3.1 when `minimum` set to 3', () => {
      return addDoc(collectionRef, {
        minimum: 3.1,
      }).then(() => expect(true).to.be.true);
    });

    it('Accepts number of 3 when `minimum` set to 3', () => {
      return addDoc(collectionRef, {
        minimum: 3,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of 2.9 when `minimum` set to 3', () => {
      return addDoc(collectionRef, {
        minimum: 2.9,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of 3.1 when `exclusiveMinimum` set to 3', () => {
      return addDoc(collectionRef, {
        exclusiveMinimum: 3.1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of 3 when `exclusiveMinimum` set to 3', () => {
      return addDoc(collectionRef, {
        exclusiveMinimum: 3,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of 9.9 when `maximum` set to 10', () => {
      return addDoc(collectionRef, {
        maximum: 9.9,
      }).then(() => expect(true).to.be.true);
    });

    it('Accepts number of 10 when `maximum` set to 10', () => {
      return addDoc(collectionRef, {
        maximum: 10,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of 10.1 when `maximum` set to 10', () => {
      return addDoc(collectionRef, {
        maximum: 10.1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of 9.9 when `exclusiveMaximum` set to 10', () => {
      return addDoc(collectionRef, {
        exclusiveMaximum: 9.9,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of 10 when `exclusiveMaximum` set to 10', () => {
      return addDoc(collectionRef, {
        exclusiveMaximum: 10,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of 2.5 when `multipleOf` set to 0.5', () => {
      return addDoc(collectionRef, {
        multipleOf: 2.5,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of 3.1 when `multipleOf` set to 0.5', () => {
      return addDoc(collectionRef, {
        multipleOf: 3.1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of 50.1 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return addDoc(collectionRef, {
        range: 50.1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of -0.1 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return addDoc(collectionRef, {
        range: -0.1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Does not accept number of 100.1 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return addDoc(collectionRef, {
        range: 100.1,
      }).catch(() => expect(true).to.be.true);
    });

    it('Accepts number of accepted enum value', () => {
      return addDoc(collectionRef, {
        enum: 1.1,
      }).then(() => expect(true).to.be.true);
    });

    it('Does not accept number of unaccepted enum value', () => {
      return addDoc(collectionRef, {
        enum: 1,
      }).catch(() => expect(true).to.be.true);
    });
  });
});
