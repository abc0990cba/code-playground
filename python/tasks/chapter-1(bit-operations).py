# Tasks. Chapter 1.
# Bit operations exercises.


# Task 1.
# Given a number k, 0≤k≤31.
# Write down the number 2 ** k, that is,
# the number whose k-th bit is 1 and the rest are zeros.
# in: 8
# out: 256
def task1(k):
    return 0b1 << k


# Task 2.
# Two unequal non-negative integers are given: k and n.
# Calculate 2**k + 2**n.
# in: 0, 1
# out: 3
def task2(k, n):
    return (0b1 << k) + (0b1 << n)


# Task 3.
# You are given an integer a and a non-negative integer number k.
# Set the number a to zero its last k bits and print the result.
# Format the calculations in the form of the clear_lower_bits (a, k) function.
# in: 3, 1
# out: 2
def clear_lower_bits(a, k):
    for i in range(k):
        a &= ~(0b1 << i)
    return a


# Task 4.
# You are given an integer a and a non-negative integer k.
# Output the number that is obtained from the number a
# by setting the value of the k-th bit to 1.
# Format the calculations in the form of the set_bit (a, k) function.
# in: 12, 1
# out: 14
def set_bit(a, k):
    return a | (0b1 << k)


# Task 5.
# You are given an integer a and a non-negative integer k.
# Output the number that is obtained from the number a by inverting the k-th bit.
# Form the calculations in the form of the toggle_bit (a, k) function.
# in: 15, 2
# out: 11
def toggle_bit(a, k):
    return a ^ (1 << k)


# Task 6.
# An integer and a non-negative integer k are given.
# Output the value of the k-th bit of the number a, that is, 0 or 1.
# Execute the calculations in the form of the test_bit (a, k) function.
# in: 179, 0
# out: 1
def test_bit(a, k):
    if (a & (1 << k)) > 0:
        return 1
    else:
        return 0


# Task 7.
# You are given an integer a and a non-negative integer k.
# Output the number that is obtained from the number
# by setting the value of the k-th bit to 0.
# Format the calculations in the form of the clear_bit (a, k) function.
# in: 14, 1
# out: 12
def clear_bit(a, k):
    return a & ~(1 << k)


# Task 8.
# An integer a and a natural number k are given.
# Print a number that consists only of the last k bits
# of the number a (that is, zero out all the bits of the number a, except for the last k).
# Format the calculations in the form of the clear_high_bits(a, k) function.
# in: 126, 3
# out: 6

#https://tproger.ru/articles/awesome-bits/
