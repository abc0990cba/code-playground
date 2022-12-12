// You can use this pattern('companion-object')
// when the type and object are semantically related,
// and the object provides utility methods that operate on the type.

// https://stefan-bauer.online/writing-better-type-script/

type Currency = {
  unit: 'EUR' | 'GBP' | 'USD';
  value: number;
}

type CurrencyCompanionObject = {
    DEFAULT: Currency['unit'];
    from(value: Currency['value'], unit: Currency['unit']): Currency;
}

let Currency: CurrencyCompanionObject = {
  DEFAULT: 'USD',
  from(value: number, unit = Currency.DEFAULT): Currency {
    return { unit, value };
  }
}

const a: Currency = {
  unit: 'GBP',
  value: 7984
}

const b = Currency.from(789, 'EUR');

console.log(a); // { "unit": "GBP", "value": 7984 } 
console.log(b); // { "unit": "EUR", "value": 789 } 
