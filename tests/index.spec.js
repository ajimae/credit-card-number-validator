var chai = require("chai");
var { cardNumberValidator: validator } = require("../index");

const expect = chai.expect;

describe("luhnn algorithm", function() {
  describe("$validate", function() {
    it("should accept valid VISA card test number", function() {
      expect(validator('4012-8888-8888-1881')).equals(true);
    });
    it("should accept valid MasterCard test number", function() {
      expect(validator('4012-8888-8888-1881')).equals(true);
    });
    it("should reject invalid numbers", function() {
      expect(validator("1234-5678-9101-2131")).equals(false);
    });
  });
});
