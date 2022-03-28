const input = document.getElementById("input")
const conversions = document.getElementById("conversions")


/*------------------------------------*\
  #CONVERSION-FUNCTIONS
\*------------------------------------*/

function convert(factor, targetUnit) {
  const value = baseValue * factor
  const unit = (value === 1) ? targetUnit[0] : targetUnit[1]
  return {
    value: value.toFixed(3),
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
    const text = `${baseValue} ${baseUnit} = ${converted[i].value} ${converted[i].unit}`
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
  input.value = baseValue

  // Display/update the conversions
  conversions.textContent = ""
  conversions.append( ...generateConversions(data) )
}


}





// Initialize
let baseValue = 20
render()
