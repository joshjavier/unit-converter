const baseNumElem = document.getElementById('baseNum')
const baseNumElems = document.getElementsByClassName('baseNum')
const computedFeetElem = document.getElementById('computedFeet')
const computedMetersElem = document.getElementById('computedMeters')
const computedGallonsElem = document.getElementById('computedGallons')
const computedLitersElem = document.getElementById('computedLiters')
const computedPoundsElem = document.getElementById('computedPounds')
const computedKilosElem = document.getElementById('computedKilos')



function meterToFeet(num) {
  return num * 3.28084
}

function feetToMeter(num) {
  return num * 0.3048
}

function literToGallon(num) {
  return num * 0.264172
}

function gallonToLiter(num) {
  return num * 3.78541
}

function kilogramToPound(num) {
  return num * 2.20462
}

function poundToKilogram(num) {
  return num * 0.453592
}


function updateBaseNum(input) {
  let num = Number(input)
  if (!num && num !== 0) {
    alert('Please enter a number ☺️')
    baseNumElem.value = baseNum // revert to the previous base number
    return
  }
  baseNum = num
  baseNumElem.value = baseNum
  for (let elem of baseNumElems) {
    elem.textContent = baseNum
  }
}


function updateComputedValues(num) {
  computedFeetElem.textContent = meterToFeet(num).toFixed(3)
  computedMetersElem.textContent = feetToMeter(num).toFixed(3)
  computedGallonsElem.textContent = literToGallon(num).toFixed(3)
  computedLitersElem.textContent = gallonToLiter(num).toFixed(3)
  computedPoundsElem.textContent = kilogramToPound(num).toFixed(3)
  computedKilosElem.textContent = poundToKilogram(num).toFixed(3)  
}


let baseNum = 20
updateBaseNum(baseNum)
updateComputedValues(baseNum)

baseNumElem.addEventListener('blur', () => {
  let input = baseNumElem.value
  updateBaseNum(input)
  updateComputedValues(baseNum)
})


/**
 * Bugs:
 * - How to deal with text overflow? longer than 6 characters
 */
