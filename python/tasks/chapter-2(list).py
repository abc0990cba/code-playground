# Chapter 2.
# List.


# Task 1.
# Write the code that rearranges all elements of array x
# with odd indices in reverse order.
# Those. if x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
# then the code should receive [0, 9, 2, 7, 4, 5, 6, 3, 8, 1]
def task1(x):
    x[1::2] = x[-1::-2]
    return x


# Task 2.
# Write a function that takes two lists
# and list of all the elements
# of the first that are not in the second.
def task2(f, s):
    set_f = set(f)
    set_s = set(s)
    return list(set_f & (set_f ^ set_s))


# Task 3.
# Lists are given:
# a = [1, 2, 89];
# b = [0, 2, 13].
# You need to return a list that consists of the elements that are common to the two lists.
def task3(a, b):
    return list(set(a) & set(b))


# Task 4.
# Generate a series of 10 random numbers from 1 to 3 and find:
# a) how many twos are more / less than the number of triples,
# b) the number of triples in even places,
# c) the number of twos among the first five numbers in the series.
import random
def task4():
    lst = []
    for i in range(10):
        lst.append(random.randint(1, 3))

    two_count = len([x for x in lst if x == 2])
    three_count = len([x for x in lst if x == 3])
    a = abs(two_count - three_count)

    b = len([x for x in lst[::2] if x == 3])

    c = len([x for x in lst[:5] if x == 2])

    return lst, a, b, c


# Task 5.
# You accept a comma-separated sequence of numbers from the user.
# Make a list and tuple of these numbers.
def task5(*args):
    return list(args), args


# Task 6.
# Reverse a given list.
def task6(lst):
    return lst[::-1]


# Task 7.
# Concatenate two lists index-wise
# in: list1 = ["M", "na", "i", "Ke"]
#     list2 = ["y", "me", "s", "lly"]
# out: list3 = ['My', 'name', 'is', 'Kelly']
def task7(lst1, lst2):
    return [x+y for x, y in zip(lst1, lst2)]


# Task 8.
# Given a Python list of numbers.
# Turn every item of a list into its square
def task8(lst):
    return [x**2 for x in lst]


# Task 9.
# Concatenate two lists in the following order
# in: list1 = ["Hello ", "take "]
#     list2 = ["Dear", "Sir"]
# out: list3 = ['Hello Dear', 'Hello Sir', 'take Dear', 'take Sir']
def task9(lst1, lst2):
    return [x+y for x in lst1 for y in lst2]


# Task 10.
# Given a two Python list.
# Iterate both lists simultaneously such
# that list1 should display item in original order
# and list2 in reverse order
# and create new list3 of tuple
# in: list1 = [1,2,3]
#     list2 = [4,5,6]
# out: list3 = [(1,6), (2,5), (3,4)]
def task10(lst1, lst2):
    return [(x, y) for x, y in zip(lst1, lst2[::-1])]


# Task 11.
# For a list, find the 25 value in the list and,
# if there is one, multiply it by 10.
# Update only the first occurrence of the value.
def task11(lst, val):
    index = lst.index(val)
    lst[index] *= 10
    return lst


# Task 12.
# Given a list, remove all occurrence of 20 from the list
def task12(lst, val):
    return [x for x in lst if x != val]


# Task 13.
# Sort odd list items in reverse order.
def task13(lst):
    lst[1::2] = sorted(lst[1::2], reverse=True)
    return lst


# https://pythonprogramminglanguage.com/randon-numbers/
# python chapter-2(list).py
