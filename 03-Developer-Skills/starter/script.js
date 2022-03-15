// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const x = 23;

console.log("gggg");

const measureKelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    // prompt always returns string so we cast to number.
    value: Number(prompt("Degrees celsius:")),
  };
  debugger;
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());
