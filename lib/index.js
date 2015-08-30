(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    if(x === null || x === undefined) return 'null';
    return x.inspect ? x.inspect() : x;
  }

  /**
    Sum

    Sum is a Monoid, making it also a Semigroup.
    Sum implements the empty and concat methods to adhere
    to the Monoid and Semigroup algebras.

    Sum only works for numbers or arrays of numbers. Should
    any other values be used the behavior is unspecified.
  **/
  var Sum = Constructor(function(value) {
    if(value instanceof Array) {
      this.value = value.reduce(function(acc, val) {
        return acc + val;
      }, 0);
    } else {
      this.value = value;
    }
  });

  /**
    Sum.empty

    Returns an "empty sum", otherwise known as zero.
  **/
  Sum.prototype.empty = function() { return Sum(0); };

  /**
    Sum.concat

    Returns the sum of sums.
  **/
  Sum.prototype.concat = function(sum2) {
    return Sum(this.value + sum2.value);
  };

  /**
    Sum.inspect

    Returns the string representation of a Sum.
  **/
  Sum.prototype.inspect = function() { return 'Sum(' + inspect(this.value) + ')'; };

  /**
    Sum.isEqual

    Compares two sums for equality.
  **/
  Sum.prototype.isEqual = function(sum2) { return deepEqual(this.value, sum2.value); };

  module.exports = Sum;
})();
