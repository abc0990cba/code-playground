# Chapter 4.
# Dictionary.

# Task 1.
# Given an array of strings mas.
# Create a dictionary in which a pair (tuple of length 2)
# will be written by the string key (string index in the array mas, string length)
def task1(lst):
    dct = dict()
    for x in lst:
        dct[x] = lst.index(x), len(x)
    return dct


# Task 2.
# Below are the two lists convert it into the dictionary.
# in: keys = ['Ten', 'Twenty', 'Thirty']
#     values = [10, 20, 30]
# out: {'Ten': 10, 'Twenty': 20, 'Thirty': 30}
def task2(keys, values):
    return dict(zip(keys, values))


# Task 3
# Merge two dictionaries into one
def task3(dct1, dct2):
    return {**dct1, **dct2}

# Second variant.
def task3_2(dct1, dct2):
    dct3 = dct1.copy()
    dct3.update(dct2)
    return dct3


# Task 4.
# Initialize dictionary with default values.
# in: employees = ['Kelly', 'Emma', 'John']
#       defaults = {"designation": 'Application Developer', "salary": 8000}
# out: {'Kelly': {'designation': 'Application Developer', 'salary': 8000},
#       'Emma': {'designation': 'Application Developer', 'salary': 8000},
#       'John': {'designation': 'Application Developer', 'salary': 8000}}
def task4(employees, defaults):
    return dict.fromkeys(employees, defaults)


# Task 5.
# Create a new dictionary by extracting
# the following keys from a below dictionary.
# in: sampleDict = {"name": "Kelly","age":25,"salary": 8000,"city": "New york"}
#     keys = ["name", "salary"]
def task5(dct, keys):
    return {x: dct[x] for x in keys}


# Task 6.
# Sort even list items in reverse order
# compose a dictionary of even and odd elements
def task6(lst):
    lst[::2] = sorted(lst[::2], reverse=True)
    return {e: o for e, o in zip(lst[::2], lst[1::2])}


print(task6(list(range(10))))
# python chapter-4(dictionary).py