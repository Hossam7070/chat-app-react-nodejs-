class Validate {
  constructor() {}
  isString(data) {
    return typeof data === "string";
  }
  isNumber(data) {
    return typeof data === "number";
  }
  isEmail(data) {
    const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return data.match(validRegex);
  }
  max(data, val) {
    return data.length > val;
  }
  min(data, val) {
    return data.length < val;
  }
}

const validator = new Validate();
module.exports = validator;
