/* global describe */
/* global it */
import assert from 'assert';
import generateUUID from '../src/utils/generate_uuid';

describe('generateUUID()', () => {

    it('creates a string', () => {
        assert.equal(typeof generateUUID(), 'string');
    });

    it('creates a string with more than 8 chars', () => {
        assert(generateUUID().length > 8);
    });

    it('creates unique ids', () => {
        const a = generateUUID();
        const b = generateUUID();
        const c = generateUUID();
        assert(a !== b, 'a !== b');
        assert(b !== c, 'b !== c');
    });

});

