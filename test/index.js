var assert = require('assert');
var laws = require('algebra.laws');
var Sum = require('../lib');

function makeSum(a)     { return new Sum(a); }
function makeListSum(a) { return new Sum([a]); }

describe('Sum', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeListSum).asTest()(); });
  });

  describe('Monoid', function() {
    it('1. Left Identity',  function() { laws.monoid.leftIdentity(makeSum).asTest()(); });
    it('2. Right Identity', function() { laws.monoid.rightIdentity(makeSum).asTest()(); });
  });

  describe('empty', function() {
    it('should create a Sum(0)', function() {
      var sum = makeSum(1);
      var sum2 = sum.empty();
      assert.equal(sum2.inspect(), 'Sum(0)');
    });
  });

  describe('concat', function() {
    it('should concat sums containing arrays', function() {
      var sum = makeSum([-1,0,1]);
      var sum2 = makeSum([2,3,4]);
      assert.equal(sum.concat(sum2).inspect(), 'Sum(9)');
    });

    it('should add sums containing single values', function() {
      var sum = makeSum(13);
      var sum2 = makeSum(-2);
      assert.equal(sum.concat(sum2).inspect(), 'Sum(11)');
    });
  });

  describe('inspect', function() {
    it('should show value of number', function() {
      var sum = makeSum(1);
      assert.equal(sum.inspect(), 'Sum(1)');
    });

    it('should show value of summed array', function() {
      var sum = makeSum([1,2,3]);
      assert.equal(sum.inspect(), 'Sum(6)');
    });
  });

  describe('isEqual', function() {
    it('should be true when sums are equal', function() {
      var sum = makeSum(1);
      var sum2 = makeSum(1);
      assert.equal(sum.isEqual(sum2), true);
    });

    it('should be false when sums are different', function() {
      var sum = makeSum(10);
      var sum2 = makeSum(11);
      assert.equal(sum.isEqual(sum2), false);
    });

    it('should be true for equal arrays', function() {
      var sum = makeSum([1,2,3]);
      var sum2 = makeSum([1,2,3]);
      assert.equal(sum.isEqual(sum2), true);
    });

    it('should be true for equal array and value', function() {
      var sum = makeSum([1,2,3]);
      var sum2 = makeSum(6);
      assert.equal(sum.isEqual(sum2), true);
    });
  });
});
