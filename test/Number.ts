import * as chai from 'chai';
import {collection, addDoc} from 'firebase/firestore';

import {firestore} from './common';

const expect = chai.expect;
const collectionRef = collection(firestore, 'NumberCollections');

describe('Number Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `number`', async () => {
      await addDoc(collectionRef, {
        simple: 0.1,
      });
      expect(true).to.be.true;
    });

    it('Does not accept property of type other than `number`', async () => {
      try {
        await addDoc(collectionRef, {
          simple: '0.1',
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of 3.1 when `minimum` set to 3', async () => {
      await addDoc(collectionRef, {
        minimum: 3.1,
      });
      expect(true).to.be.true;
    });

    it('Accepts number of 3 when `minimum` set to 3', async () => {
      await addDoc(collectionRef, {
        minimum: 3,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of 2.9 when `minimum` set to 3', async () => {
      try {
        await addDoc(collectionRef, {
          minimum: 2.9,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of 3.1 when `exclusiveMinimum` set to 3', async () => {
      await addDoc(collectionRef, {
        exclusiveMinimum: 3.1,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of 3 when `exclusiveMinimum` set to 3', async () => {
      try {
        await addDoc(collectionRef, {
          exclusiveMinimum: 3,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of 9.9 when `maximum` set to 10', async () => {
      await addDoc(collectionRef, {
        maximum: 9.9,
      });
      expect(true).to.be.true;
    });

    it('Accepts number of 10 when `maximum` set to 10', async () => {
      await addDoc(collectionRef, {
        maximum: 10,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of 10.1 when `maximum` set to 10', async () => {
      try {
        await addDoc(collectionRef, {
          maximum: 10.1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of 9.9 when `exclusiveMaximum` set to 10', async () => {
      await addDoc(collectionRef, {
        exclusiveMaximum: 9.9,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of 10 when `exclusiveMaximum` set to 10', async () => {
      try {
        await addDoc(collectionRef, {
          exclusiveMaximum: 10,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of 2.5 when `multipleOf` set to 0.5', async () => {
      await addDoc(collectionRef, {
        multipleOf: 2.5,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of 3.1 when `multipleOf` set to 0.5', async () => {
      try {
        await addDoc(collectionRef, {
          multipleOf: 3.1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of 50.1 when `minimum` is set to 0 and `maximum` is set to 100', async () => {
      await addDoc(collectionRef, {
        range: 50.1,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of -0.1 when `minimum` is set to 0 and `maximum` is set to 100', async () => {
      try {
        await addDoc(collectionRef, {
          range: -0.1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Does not accept number of 100.1 when `minimum` is set to 0 and `maximum` is set to 100', async () => {
      try {
        await addDoc(collectionRef, {
          range: 100.1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });

    it('Accepts number of accepted enum value', async () => {
      await addDoc(collectionRef, {
        enum: 1.1,
      });
      expect(true).to.be.true;
    });

    it('Does not accept number of unaccepted enum value', async () => {
      try {
        await addDoc(collectionRef, {
          enum: 1,
        });
        expect(false).to.be.true; // Should not reach here
      } catch (e) {
        expect(true).to.be.true;
      }
    });
  });
});
