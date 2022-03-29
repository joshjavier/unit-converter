const input = document.getElementById("input")
const conversions = document.getElementById("conversions")


/*------------------------------------*\
  #CONVERSION-FUNCTIONS
\*------------------------------------*/

function convert(factor, targetUnit) {
  const value = baseValue * factor
  const unit = (value === 1) ? targetUnit[0] : targetUnit[1]

  return {
    value: value,
    unit: unit
  }
}

function generateText(unit1, unit2) {
  const _units = [unit1, unit2]
  const converted = _units.map(unit => convert(factors[unit], units[unit]))

  _units.reverse()
  let result = []
  for (let i = 0; i < converted.length; i++) {
    const baseUnit = (baseValue === 1) ? units[_units[i]][0] : units[_units[i]][1]
    const baseString = `${baseValue.toLocaleString("en-US")} ${baseUnit}`
    const convertedString = `${converted[i].value.toLocaleString("en-US")} ${converted[i].unit}`
    const text = `${baseString} = ${convertedString}`
    result.push(text)
  }

  return result.join(" | ")
}

function generateConversions(data) {
  return data.map(item => {
    const container = document.createElement("div")
    const title = document.createElement("h2")
    const text = document.createElement("p")

    title.textContent = item.title
    text.textContent = generateText(item.unit1, item.unit2)

    container.append(title, text)
    return container
  })
}

function render() {
  // Display/update the base value
  input.value = baseValue.toLocaleString("en-US")

  // Display/update the conversions
  conversions.textContent = ""
  conversions.append( ...generateConversions(data) )
}


/*------------------------------------*\
  #EVENT-HANDLERS
\*------------------------------------*/

function validateInput(event) {
  if (event.type === "focus") {
    event.target.value = baseValue
  }

  if (event.type === "input") {
    const value = event.target.value
    const decimalCount = value.replace(/[^\.]/g, "").length

    // Prevent the user from entering non-digit characters
    let sanitizedValue = value.replace(/[^\.\d]/g, "")

    // Prevent the user from entering more than 1 decimal point
    if (decimalCount > 1) {
      const index = value.indexOf(".")
      const wholeNumber = value.slice(0, index)
      const fractionalPart = value.slice(index).replace(/\./g, "")

      sanitizedValue = wholeNumber + "." + fractionalPart
    }

    event.target.value = sanitizedValue
  }
}

function blurInput(event) {
  // Don't surprise users - make the Enter/Space key run the conversions
  if (["Enter", " "].includes(event.key)) {
    event.target.blur()
  }
}

function runConversion(event) {
  const value = event.target.value
  baseValue = Number(value) || 0
  render()
}


input.addEventListener('focus', validateInput)
input.addEventListener('input', validateInput)
input.addEventListener('keyup', blurInput)
input.addEventListener('blur', runConversion)


// Initialize
let baseValue = 20
render()
