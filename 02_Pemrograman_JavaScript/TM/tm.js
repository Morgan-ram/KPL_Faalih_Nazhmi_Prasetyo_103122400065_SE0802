function fizzBuzz(params) {
  if (!Array.isArray(params)) {
    return "Input tidak valid";
  }

  let result = [];
  for (let i = 0; i < params.length; i++) {
    if (params[i] % 14 === 0) {
      result.push("FizzBuzz");
    } else if (params[i] % 7 === 0) {
      result.push("Buzz");
    } else if (params[i] % 2 === 0) {
      result.push("Fizz");
    } else {
      result.push(params[i].toString());
    }
  }

  let output;
  if (params.includes(1)) {
    output = result.join(", ");
  } else if (params.includes(-1)) {
    output = result.join(", ");
  } else {
    output = result.join(" ");
  }

  return output;
}

module.exports = fizzBuzz;