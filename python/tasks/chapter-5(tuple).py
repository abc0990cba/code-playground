# Chapter 5.
# Tuple.


# Task 1.
# Create a tuple with single item 50
def task1():
    return (50,)


# Task 2.
# Swap the following two tuples.
def task2(a, b):
    a, b = b, a
    return a, b


# Task 3.
# Sort a tuple of tuples by 2nd item.
# in: (('a', 23),('b', 37),('c', 11), ('d',29))
# out: (('b', 37), ('d', 29), ('a', 23), ('c', 11))
def task3(tpl):
    return tuple(sorted(list(tpl), key=lambda x: x[1], reverse=True))


# Task 4.
# Counts the number of occurrences of item "a" from a tuple
# in: a=50, tpl=(50, 10, 60, 70, 50)
# out: 2
def task4(a, tpl):
    return tpl.count(a)


# Task 5.
# Check if all items in the following tuple are the same
# using method all()
# all() method returns:
#   True - If all elements in an iterable are true.
#   False - If any element in an iterable is false
def task5(tpl):
    bool_tpl = (x == tpl[0] for x in tpl)
    return all(bool_tpl)




# python chapter-5(tuple).py