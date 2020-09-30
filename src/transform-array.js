const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if (!Array.isArray(arr)) throw new Error();

  const result = [];
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    switch (arr[i]) {
      case '--discard-next':
        i += ['--discard-prev', '--double-prev'].includes(arr[i + 2]) ? 2 : 1;
        break;

      case '--double-next':
        ++i < len && result.push(arr[i], arr[i]);
        break;

      case '--discard-prev':
        i - 1 >= 0 && result.splice(-1, 1);
        break;

      case '--double-prev':
        i - 1 >= 0 && result.push(arr[i - 1]);
        break;

      default:
        result.push(arr[i]);
    }
  }

  return result;
};
