# Chapter 8.
# List comprehension.


# Task 1.
# Write a function that takes a string and returns
# a list of the lengths of the words in the string.
def task1(words):
    return [len(word) for word in words.split(" ")]


# Task 2.
# Write a function that takes a range of integers,
# and returns a string of those numbers with commas in between.
def task2(rng):
    return ",".join([str(x) for x in rng])


# Task 3.
# A list of strings containing numbers in hexadecimal is given.
# Find the sum of these numbers
def task3(lst):
    return sum([int(x, 16) for x in lst])


# Task 4.
# Given list of numbers.
# Return list: new_list[i] = list[i] + list[i+1]
def task4(lst):
    return [x+y for x, y in zip(lst[1:], lst[:-1])]


# Task 5.
# Define a list of five dictionaries.
# Each dictionary has two key-value pairs, name and age (in years).
# Using list inclusion create a list of dictionaries containing three pairs
# key-value - name, age and age_in_month,
# and exclude persons over 20 years old from the dictionary.
def task5():
    lst = [{"name": "ed", "age": 30},
           {"name": "dan", "age": 15},
           {"name": "alex", "age": 22},
           {"name": "petro", "age": 19},
           {"name": "frank", "age": 43}]
    lst = [{**x, **{"age_in_month": x["age"]*12}} for x in lst if x["age"] <= 20]
    return lst


# python chapter-8(list-comprehension).py