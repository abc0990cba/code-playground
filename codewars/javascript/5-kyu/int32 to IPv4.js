// 5 kyu
// int32 to IPv4
// https://www.codewars.com/kata/52e88b39ffb6ac53a400022e

// Task description:
// Take the following IPv4 address: 128.32.10.1
// This address has 4 octets where each octet is a single byte (or 8 bits).
// 1st octet 128 has the binary representation: 10000000
// 2nd octet 32 has the binary representation: 00100000
// 3rd octet 10 has the binary representation: 00001010
// 4th octet 1 has the binary representation: 00000001
// So 128.32.10.1 == 10000000.00100000.00001010.00000001
// Because the above IP address has 32 bits, we can represent it as the unsigned 32 bit number: 2149583361
// Complete the function that takes an unsigned 32 bit number and returns a string representation of its IPv4 address.

// Examples:
// 2149583361 ==> "128.32.10.1"
// 32         ==> "0.0.0.32"
// 0          ==> "0.0.0.0"

// Solution 1
function int32ToIp1(int32) {
  if (!int32) {
    return "0.0.0.0"
  }
  return (
    int32.toString(2) // radix = 2
         .padStart(32, '0') // added 0s to start for 32 bits
         .match(/\d{8}/g) // match 8 digits
         .map(v => parseInt(v, 2)) // parse binary data to int
         .join('.') 
  );
}

// Solution 2
function int32ToIp2(int32) {
// In 32 bit format system the hexadecimal value 0xff represents 00000000000000000000000011111111
// that is 255(15 * 16 ^ 1 + 15 * 16 ^ 0) in decimal.
// And the bitwise & operator masks the same 8 right most bits as in first operand.
 return (
          ((int32 >> 24) & 0xFF) + "." +
          ((int32 >> 16) & 0xFF) + "." +
          ((int32 >>  8) & 0xFF) + "." +
          ((int32) & 0xFF)
        );
 
}
