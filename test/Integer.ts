import * as chai from 'chai';
import {collection, addDoc} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'IntegerCollections');

describe('Integer Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `integer`', async () => {
      await addDoc(collectionRef, {
        simple: 1,
      });
      expect(true).to.be.true;
    });

    it('Does not accept property of type other than `integer`', async () => {
      try {
        await addDoc(collectionRef, {
          simple: '1',
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Does not accept property of type `number`', async () => {
      try {
        await addDoc(collectionRef, {
          simple: 0.1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of 3 when `minimum` set to 3', async () => {
      await addDoc(collectionRef, {
        minimum: 3,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of 2 when `minimum` set to 3', async () => {
      try {
        await addDoc(collectionRef, {
          minimum: 2,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of 4 when `exclusiveMinimum` set to 3', async () => {
      await addDoc(collectionRef, {
        exclusiveMinimum: 4,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of 3 when `exclusiveMinimum` set to 3', async () => {
      try {
        await addDoc(collectionRef, {
          exclusiveMinimum: 3,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of 10 when `maximum` set to 10', async () => {
      await addDoc(collectionRef, {
        maximum: 10,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of 11 when `maximum` set to 10', async () => {
      try {
        await addDoc(collectionRef, {
          maximum: 11,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of 9 when `exclusiveMaximum` set to 10', async () => {
      await addDoc(collectionRef, {
        exclusiveMaximum: 9,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of 10 when `exclusiveMaximum` set to 10', async () => {
      try {
        await addDoc(collectionRef, {
          exclusiveMaximum: 10,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of 100 when `multipleOf` set to 10', async () => {
      await addDoc(collectionRef, {
        multipleOf: 100,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of 101 when `multipleOf` set to 10', async () => {
      try {
        await addDoc(collectionRef, {
          multipleOf: 101,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of 50 when `minimum` is set to 0 and `maximum` is set to 100', async () => {
      await addDoc(collectionRef, {
        range: 50,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of -1 when `minimum` is set to 0 and `maximum` is set to 100', async () => {
      try {
        await addDoc(collectionRef, {
          range: -1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Does not accept integer of 101 when `minimum` is set to 0 and `maximum` is set to 100', async () => {
      try {
        await addDoc(collectionRef, {
          range: 101,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts integer of accepted enum value', async () => {
      await addDoc(collectionRef, {
        enum: 1,
      });
      expect(true).to.be.true;
    });

    it('Does not accept integer of unaccepted enum value', async () => {
      try {
        await addDoc(collectionRef, {
          enum: 4,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
  });
});
