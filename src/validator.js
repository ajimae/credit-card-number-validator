function validateCreditCard(cardNumber) {
  var toDigits = cardNumber
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);

  var reverseDigits = toDigits.slice(0, (toDigits.length - 1)).reverse();

  var transformDigit = function(condition, currentValue, callback) {
    if (condition) {
      return callback(currentValue);
    }
    return currentValue;
  };

  var doubleAlternateNumber = reverseDigits.map(function(currentValue, index) {
    return transformDigit(index % 2 === 0, currentValue, function(digit) {
      return digit * 2;
    });
  });

  var subtractKeyDigit = doubleAlternateNumber.map(function(
    currentValue
  ) {
    return transformDigit(currentValue > 9, currentValue, function(digit) {
      return digit - 9;
    });
  });

  var reducedDigits = subtractKeyDigit.reduce(function(
    currentValue,
    accumulator
  ) {
    return currentValue + accumulator;
  },
  toDigits[toDigits.length - 1]);

  return reducedDigits % 10 === 0;
}

module.exports = validateCreditCard;
