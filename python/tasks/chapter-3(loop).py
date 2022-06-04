# Chapter 3.
# Loop.

# Task 1.
# Write a function, reads a string of integers, separated by space,
# split numbers, and create a list of the squares of those numbers.
def task1(s):
    lst = [int(x) ** 2 for x in s.split(" ")]
    return lst


# Task 2.
# Given a number count the total number of digits in a number
def task2(num):
    count = 0
    while num != 0:
        num //= 10
        count += 1
    return count


# Task 3.
# Write a program to display all prime numbers within a range.
# A Prime Number is a whole number that
# cannot be made by multiplying other whole numbers
def task3(start, end):
    prime_list = []
    for num in range(start, end+1):
        # all prime numbers are greater than 1
        # if number is less than or equal to 1, it is not prime
        for i in range(2, num):
            if (num % i) == 0:
                break
        else:
            prime_list.append(num)
    return prime_list


# Task 4.
# Return Fibonacci series up to 'count' terms
def task4(count):
    num0 = 0
    num1 = 1
    fib_list = [num0, num1]
    i = len(fib_list)
    while i < count:
        tmp = num0 + num1
        num0 = num1
        num1 = tmp
        fib_list.append(num1)
        i += 1
    return fib_list


# Task 5.
# The input is a string of number-word pairs of the form:
# "1:adf 2:434 90:kdk 0:kdke".
# Write a line of code that will return dictionary with numbers
# as keys and strings as values.
def task5(s):
    lst_pair = s.split(" ")
    dct = {}
    for i in lst_pair:
        num, word = i.split(":")
        num = int(num)
        dct.update({num: word})  # or dct[num] = word
    return dct


# Task 6.
# Create list [1..10] and multiply each element by its index in the list.
def task6():
    lst = list(range(1, 11))
    for i, x in enumerate(lst):
        lst[i] = x * i
    return lst


# python chapter-3(loop).py