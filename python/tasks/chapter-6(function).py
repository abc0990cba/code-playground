# Chapter 6.
# Function.

import string
import random


# Task 1.
# Write a function that generate password.
def task1():
    min_pas_length = 10
    max_pas_length = 16
    length = random.randint(min_pas_length, max_pas_length)
    symbols = string.ascii_letters + string.digits + string.punctuation

    password_list = [random.choice(symbols) for i in range(length)]
    password = "".join(password_list)

    return password


# Task 2.
# Write a function that validates the generated password against
# four criteria: min_uppercase, min_lowercase, min_punctuation, and min_digits.
# The function must return bool.
# Without regular expressions.
def task2(password,
          min_uppercase=2,
          min_lowercase=2,
          min_punctuation=2,
          min_digits=2):
    for x in password:
        if x.isdigit():
            min_digits -= 1
        elif x.isalpha():
            if x.isupper():
                min_uppercase -= 1
            elif x.islower():
                min_lowercase -= 1
        elif x in string.punctuation:
            min_punctuation -= 1

    if min_punctuation <= 0 \
            and min_uppercase <= 0 \
            and min_lowercase <= 0 \
            and min_digits <= 0:
        return True
    else:
        return False


# Task 3.
# Write a function "get_item", that takes one argument
# and returns a function "f" that can be applied to any given structure
# whose elements can be accessed using square brackets and returns that element.
# For example, f = getitem ('a'),
# and if we have a dictionary d = {'a': 1, 'b': 2}, then f (d) will return 1.
def get_item(s):
    def f(d):
        return d[s]
    return f


# Task 4.
# Write a function,
# that takes two functions f1 and f2 as arguments
# and returns one complex function g(x) = f2(f1(x))
def task4(f1, f2):
    def g(x):
        return f2(f1(x))
    return g


# Task 5.
# Write a function that reverses the word order in a sentence
def task5(sentence):
    words = sentence.split(" ")
    words.reverse()
    return " ".join(words)


# Task 6.
# Write a function that makes a vector from a matrix,
# i.e. flatten ([[1,2], [3,4]]) will return [1,2,3,4].
def flatten(mtrx):
    if len(mtrx) == 0:
        return mtrx
    if isinstance(mtrx[0], list):
        return flatten(mtrx[0]) + flatten(mtrx[1:])
    return mtrx[:1] + flatten(mtrx[1:])

# python chapter-6(function).py