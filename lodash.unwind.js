const _ = require('lodash');

module.exports = {
  unwind(
    obj,
    key,
    func = function (i, ii) {
      return Object.assign({}, i, { [key]: ii });
    }
  ) {
    const result = [];

    _.each(obj, (item) => {
      if (_.isArray(item[key])) {
        _.each(_.get(item, key), (iitem) => {
          result.push(func(_.omit(_.clone(item), key), iitem));
        });
      } else {
        result.push(item);
      }
    });

    return result;
  }
};
