// 6 kyu
// 1/n- Cycle
// https://www.codewars.com/kata/5a057ec846d843c81a0000ad

// Task description:
// Let be n an integer prime with 10 e.g. 7.
// 1/7 = 0.142857 142857 142857 ....
// We see that the decimal part has a cycle: 142857. The length of this cycle is 6. In the same way:
// 1/11 = 0.09 09 09 .... Cycle length is 2.
// Task
// Given an integer n (n > 1), the function cycle(n) returns the length of the cycle if n and 10 are coprimes, otherwise returns -1.
// Exemples:
// cycle(5) = -1
// cycle(13) = 6 -> 0.076923 076923 0769
// cycle(21) = 6 -> 0.047619 047619 0476
// cycle(27) = 3 -> 0.037 037 037 037 0370
// cycle(33) = 2 -> 0.03 03 03 03 03 03 03 03
// cycle(37) = 3 -> 0.027 027 027 027 027 0
// cycle(94) = -1 
// cycle(22) = -1 since 1/22 ~ 0.0 45 45 45 45 ...

// Solution:
// based on: https://qna.habr.com/q/705549
// Since we are interested in the fraction 1 / n, the variable 'amount' is initially equal to 1.
// The first digit, since n>1, is always 0 integers. And then there are fractions.
// To get the first digit after the decimal point,
// the existing remainder from the previous step (1) is multiplied by 10 and divided by n.

// For example, 1/7.
// We write down 0. remainder 1
// 1 * 10 = 10, divide 10 / 7, you get 1 whole and 3/7
// The number 1 is the first after the decimal point (but it is not needed in this task in any way),
// and the remainder is 3:
// 0.1
// remainder 3

function cycle(n) {
    if (n % 2 == 0 || n % 5 == 0) {
        return -1
    } else {
        let res = 10 % n;
        let amount = 1;
        console.log(res);
        while (res != 1) {
            res = res * 10 % n;
            amount++;
        }
        return amount;
    }
}

// This remainder is then again multiplied by 10 * 3 = 30 and again divided by 7 to get the next number (4).
// And so on.
// Until the unit appears again - we started with it, which means that its second appearance is already
// a new round of the cycle of numbers.
