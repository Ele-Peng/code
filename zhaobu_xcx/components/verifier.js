function isPositiveInt(v) {
  if (parseInt(v) > 0) {
    return true;
  } else {
    return false;
  }
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

exports.isPositiveInt = isPositiveInt
exports.sayGoodbye = sayGoodbye