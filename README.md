# Unit Converter

A solo project from the [Scrimba Frontend Developer Career Path](https://scrimba.com/learn/frontend)

## Table of contents

- [Overview](#overview)
  - [Requirements](#requirements)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Requirements

- [x] Save number to a variable in code
- [x] When app loads, do calculations and display the results
- [x] Round numbers to 3 decimal places
- [x] Check out [this CSS gradient generator](https://www.joshwcomeau.com/gradient-generator/)
- [x] Stretch: Add an input for the user to change the number and automatically recalculate the values when it changes

### Screenshot

![Unit Converter (animated preview)](./unit-converter-preview.gif)

### Links

- Live Site URL: [https://joshjavier.github.io/unit-converter/](https://joshjavier.github.io/unit-converter/)
- Scrim URL: [https://scrimba.com/scrim/cob8c43af89c8a77efcf42588](https://scrimba.com/scrim/cob8c43af89c8a77efcf42588)

## My process

### Built with

- Semantic HTML5 markup
- CSS Flexbox
- Mobile-first workflow
- Vanilla JS

### What I learned

#### Input validation and better mobile UX

Configuring the input element was one of the main challenges I encountered for this project. I wanted to do two things: 1) prevent the user from typing non-digit characters, and 2) use the number keypad for mobile and touchscreen users. `input type="number"` satisfied the first goal, but I wasn't satisfied with how on iOS the keyboard includes a bunch of symbols. Then I learned about `inputmode="decimal"` which effectively limits the user input to numbers and decimal point on mobile. For desktop users, they can still enter non-digit characters, so I settled on making an input handler that validates/sanitizes the user's input.

#### Structuring the conversion logic

Initially, I had a single function for every unit that needs to be converted, like so:

```js
function meterToFeet(num) {
  return num * 3.28084
}

function feetToMeter(num) {
  return num * 0.3048
}

// and so on...
```

Looks like this could be made DRY-er. But how? In my search I learned about conversion factors and how converting units is simply [multiplying a unit by a carefully chosen form of 1](https://brownmath.com/bsci/convert.htm). I won't be breaking down the math here, but eventually I decided to have a separate `conversion.js` file that contains a `factors` object, which looks like:

```js
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

  // and so on...
}
```

Using a getter function seems unnecessary, but I thought it's safer than manually typing the same number twice (since every second factor is just an inverted version of the first), which could lead to typos.

I also have a `units` object in `conversion.js` which contains the singular and plural versions of the units.

Then I wrote a `convert` function that accepts `factor` and `targetUnit` as arguments:

```js
function convert(factor, targetUnit) {
  const value = baseValue * factor
  const unit = (value === 1) ? targetUnit[0] : targetUnit[1]

  return {
    value: value,
    unit: unit
  }
}
```

From there, it's only a matter of assembling the strings and components to be appended to the DOM.

You can [inspect the code](https://github.com/joshjavier/unit-converter/blob/main/index.js) for a closer look.

### Continued development

- Look into [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) which allows setting `unit` and `unitDisplay` values. I did a bit of testing and discovered that it automatically chooses between singular ("1 foot") and plural ("0.37 feet") so this might be good alternative for refactoring.

### Useful resources

- [How to Convert Units of Measurement](https://brownmath.com/bsci/convert.htm) - This helped me grok unit conversions and improve the app architecture to make it "extensible" (adding new conversion factors and units).

- [Appendix C of NIST Handbook 44, 2022 Edition](https://www.nist.gov/system/files/documents/2021/11/30/2022-HB44-Section-Appendix-C.pdf) - A comprehensive list of conversion factors by the National Institute of Standards and Technology.

- [You probably don't need input type="number"](https://bradfrost.com/blog/post/you-probably-dont-need-input-typenumber/) - Short post on the pitfalls of using number inputs for things that aren't really "numbers" like credit cards and bank account numbers.

- [Everything You Ever Wanted to Know About inputmode](https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/) - This is where I discovered the existence of `inputmode="decimal"` which solved the issue where the number keypad on iOS when using `pattern="[0-9]*"` doesn't have a decimal button.

## Author

- Website (under construction)
- GitHub - [@joshjavier](https://github.com/joshjavier)
- Twitter - [@joshjavierr](https://twitter.com/joshjavierr)
- LinkedIn - [@joshjavier](https://www.linkedin.com/in/joshjavier/)

