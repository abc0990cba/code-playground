// 5 kyu
// (Ready for) Prime Time
// https://www.codewars.com/kata/521ef596c106a935c0000519/javascript

// Task description:
// We need prime numbers and we need them now!
// Write a method that takes a maximum bound and returns all primes up to and including the maximum bound.
// For example:
// prime(11);
// Should return an array that looks like this:
// [2, 3, 5, 7, 11]

function prime(num) {
  let primes = [];

  for (let i = 1; i <= num; ++i) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  
  return primes;
}

function isPrime(n) {
  let rootSquare = Math.sqrt(n);
  
 // If a number n is not a prime, it can be factored into two factors a and b:
 // n = a * b
 // Now a and b can't be both greater than the square root of n, since then the product a * b
 // would be greater than sqrt(n) * sqrt(n) = n. So in any factorization of n, at least one of the factors must be
 // smaller than the square root of n, and if we can't find any factors less than or equal to the square root, n must be a prime.
  for (let i = 2; i <= rootSquare; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n !== 1;
}
