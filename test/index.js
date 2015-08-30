var assert = require('assert');
var laws = require('algebra.laws');
var Sum = require('../lib');

function makeSum(a)     { return new Sum(a); }
function makeListSum(a) { return new Sum([a]); }

describe('Sum', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeSum).asTest()(); });
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
      var sum2 = makeSum([-2,0,2]);
      assert.equal(sum.concat(sum2).inspect(), 'Sum(-1,0,1,-2,0,2)');
    });

    it('should add sums containing single values', function() {
      var sum = makeSum(13);
      var sum2 = makeSum(-2);
      assert.equal(sum.concat(sum2).inspect(), 'Sum(11)');
    });

    it('should add strings', function() {
      var sum = makeSum('hello');
      var sum2 = makeSum('world');
      assert.equal(sum.concat(sum2).inspect(), 'Sum(helloworld)');
    });
  });

  describe('inspect', function() {
    it('should show value of string', function() {
      var sum = makeSum('1');
      assert.equal(sum.inspect(), 'Sum(1)');
    });

    it('should show value of number', function() {
      var sum = makeSum(1);
      assert.equal(sum.inspect(), 'Sum(1)');
    });

    it('should show value of array', function() {
      var sum = makeSum([1,2,3]);
      assert.equal(sum.inspect(), 'Sum(1,2,3)');
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

    it('should be true for equal strings', function() {
      var sum = makeSum('1');
      var sum2 = makeSum('1');
      assert.equal(sum.isEqual(sum2), true);
    });

    it('should be true for equal arrays', function() {
      var sum = makeSum([1,2,3]);
      var sum2 = makeSum([1,2,3]);
      assert.equal(sum.isEqual(sum2), true);
    });
  });
});
