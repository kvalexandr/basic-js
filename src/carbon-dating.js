const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

module.exports = function dateSample(sampleActivity) {
  if (sampleActivity && /^[0-9]&/.test(sampleActivity)) {
    const a1 = Math.log(MODERN_ACTIVITY / +sampleActivity);
    const a2 = Math.LN2 / HALF_LIFE_PERIOD;
    return Math.ceil(a1 / a2);
  }

  return false;
};
