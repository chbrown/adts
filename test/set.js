/*jslint node: true */ /*globals describe, it */
var adts = require('../');
var assert = require('assert');

var Set = adts.Set;

describe('{m,o,d,e,l}', function() {
  var model = new Set(['m', 'o', 'd', 'e', 'l']);
  it('should equal {l,o,m,e,d}', function() {
    var equivalent = new Set(['l', 'o', 'm', 'e', 'd']);
    assert(model.equals(equivalent));
  });
  it('should not equal {e,l,s,e}', function() {
    var inequivalent = new Set(['e', 'l', 's', 'e']);
    assert(!model.equals(inequivalent));
  });
  it('should not equal {super,m,o,d,e,l} (a superset)', function() {
    var superset = new Set(['super', 'm', 'o', 'd', 'e', 'l']);
    assert(!model.equals(superset));
  });
  it('should not equal {m,o,d} (a subset)', function() {
    var subset = new Set(['m', 'o', 'd']);
    assert(!model.equals(subset));
  });
});

describe('{a,b,c}._add(d)', function() {
  var abc = new Set(['a', 'b', 'c']);
  it('should modify and return the original Set', function() {
    var abcd = abc._add('d');
    assert(abc.equals(new Set(['a', 'b', 'c', 'd'])));
    assert(abcd.equals(abc));
    assert.equal(abcd, abc);
  });
});

describe('{a,b,c}.add(d)', function() {
  var abc = new Set(['a', 'b', 'c']);
  it('should return a new Set and not modify the original Set', function() {
    var abcd = abc.add('d');
    assert(abc.equals(new Set(['a', 'b', 'c'])));
    assert(abcd.equals(new Set(['a', 'b', 'c', 'd'])));
    assert.notEqual(abcd, abc);
  });
});

describe('Set.intersection([{a,b,c}, {b,c,d}, {b,d,e}])', function() {
  var abc = new Set(['a', 'b', 'c']);
  var bcd = new Set([     'b', 'c', 'd']);
  var bde = new Set([     'b',      'd', 'e']);
  it('should return {b}', function() {
    var intersection = Set.intersection([abc, bcd, bde]);
    assert(intersection.equals(new Set(['b'])));
  });
});

describe('Set.contain([{a,b,c}, {b,c,d}], ?)', function() {
  var abc = new Set(['a', 'b', 'c']);
  var bcd = new Set([     'b', 'c', 'd']);
  it('should return true for b and c', function() {
    assert(Set.contain([abc, bcd], 'b'));
    assert(Set.contain([abc, bcd], 'c'));
  });
  it('should return false for a and d', function() {
    assert(!Set.contain([abc, bcd], 'a'));
    assert(!Set.contain([abc, bcd], 'd'));
  });
});

describe('Set.union([{a,b,c}, {b,c,d}, {b,d,e}])', function() {
  var abc = new Set(['a', 'b', 'c']);
  var bcd = new Set([     'b', 'c', 'd']);
  var bde = new Set([     'b',      'd', 'e']);
  it('should return {a,b,c,d,e}', function() {
    var union = Set.union([abc, bcd, bde]);
    assert(union.equals(new Set(['a', 'b', 'c', 'd', 'e'])));
  });
});
