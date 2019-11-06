/**
 * - split the card number into individual characters, convert each to digits(or number)
 * - start with the right most character excluding the check digit and double each with
 *   second or alternate digit with a factor e.g 9 in this case
 * - if any digit is greater than the factor, subtract the factor from the digit e.g
 *   digit > 9 then digit - 9
 * - sum up resulting digits array, if the number is a multiple of 10, then the number
 *   is valid else it's not a valid credit card number.
 * 
 *   Example
 *   - Split into digits: 4 0 1 2 8 8 8 8 8 8 8 8 1 8 8 1.
 *   - Double every second except the check digit, right to left: 8 0 2 2 16 8 16 8 16 8 16 8 2 8 16 1.
 *   - Add digits of any above nine: 8 0 2 2 7 8 7 8 7 8 7 8 2 8 7 1.
 *   - Sum the digits: 90.
 *   - Is the sum a multiple of 10? - true.
 * 
 * @param {string} cardNumber 
 * 
 * @return {boolean} true | false
 */

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
