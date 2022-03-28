const factors = {
  // Meter - Feet
  // 1 ft  = 0.304 8 m
  m: 0.3048,
  get ft() {
    return 1 / this.m
  },

  // Liters - Gallons
  // 1 gal = 3.785 411 784 L
  L: 3.785411784,
  get gal() {
    return 1 / this.L
  },

  // Kilograms - Pounds
  // 1 lb  = 0.453 592 37 kg
  kg: 0.45359237,
  get lb() {
    return 1 / this.kg
  },

  // Add conversion factors here following the format above
  // See NIST Handbook 44 Appendix C for more conversion factors
}

const units = {
  ft: ["foot", "feet"],
  m: ["meter", "meters"],
  L: ["liter", "liters"],
  gal: ["gallon", "gallons"],
  kg: ["kilo", "kilos"],
  lb: ["pound", "pounds"],

  // Add corresponding units here following the format above
}


const data = [
  {
    title: "Length (Meter/Feet)",
    unit1: "ft",
    unit2: "m"
  },
  {
    title: "Volume (Liters/Gallons)",
    unit1: "gal",
    unit2: "L"
  },
  {
    title: "Mass (Kilograms/Pounds)",
    unit1: "lb",
    unit2: "kg"
  },

  // Add new conversion items here following the format above
]
