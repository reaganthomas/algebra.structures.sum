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
  **/
  var Sum = Constructor(function(value) {
    this.value = value;
  });

  /**
    Sum.empty

    Returns an "empty sum", otherwise known as zero.
  **/
  Sum.prototype.empty = function() { return Sum(0); };

  /**
    Sum.concat

    Returns the sum of sums. In the event either sum is an array
    the values are instead concatenated and returned, wrapped by Sum.
  **/
  Sum.prototype.concat = function(sum2) {
    if(this.value instanceof Array && sum2.value instanceof Array) {
      return Sum(this.value.concat(sum2.value));
    }
    else if(this.value instanceof Array) return Sum(this.value.concat([sum2.value]));
    else if(sum2.value instanceof Array) return Sum(sum2.value.concat([this.value]));

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
