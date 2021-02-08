import * as chai from 'chai';

import {firestore} from './common';

const expect = chai.expect;
const collection = firestore.collection('IntegerCollection');

describe('Integer Tests:', () => {
  describe('Create Tests:', () => {
    it('Accepts property of type `integer`', () => {
      return collection
        .add({
          simple: 1,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept property of type other than `integer`', () => {
      return collection
        .add({
          simple: '1',
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Does not accept property of type `number`', () => {
      return collection
        .add({
          simple: 0.1,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 3 when `minimum` set to 3', () => {
      return collection
        .add({
          minimum: 3,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 2 when `minimum` set to 3', () => {
      return collection
        .add({
          minimum: 2,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 4 when `exclusiveMinimum` set to 3', () => {
      return collection
        .add({
          exclusiveMinimum: 4,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 3 when `exclusiveMinimum` set to 3', () => {
      return collection
        .add({
          exclusiveMinimum: 3,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 10 when `maximum` set to 10', () => {
      return collection
        .add({
          maximum: 10,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 11 when `maximum` set to 10', () => {
      return collection
        .add({
          maximum: 11,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 9 when `exclusiveMaximum` set to 10', () => {
      return collection
        .add({
          exclusiveMaximum: 9,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 10 when `exclusiveMaximum` set to 10', () => {
      return collection
        .add({
          exclusiveMaximum: 10,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 100 when `multipleOf` set to 10', () => {
      return collection
        .add({
          multipleOf: 100,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 101 when `multipleOf` set to 10', () => {
      return collection
        .add({
          multipleOf: 101,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of 50 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return collection
        .add({
          range: 50,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of -1 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return collection
        .add({
          range: -1,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Does not accept integer of 101 when `minimum` is set to 0 and `maximum` is set to 100', () => {
      return collection
        .add({
          range: 101,
        })
        .catch(() => expect(true).to.be.true);
    });

    it('Accepts integer of accepted enum value', () => {
      return collection
        .add({
          enum: 1,
        })
        .then(() => expect(true).to.be.true);
    });

    it('Does not accept integer of unaccepted enum value', () => {
      return collection
        .add({
          enum: 4,
        })
        .catch(() => expect(true).to.be.true);
    });
  });
});
