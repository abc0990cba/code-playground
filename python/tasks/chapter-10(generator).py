# Chapter 10.
# Generator.

import sys

# Task 1.
# Create two functions : first - count generator, second - function that use generator.
def task1_generator(num: int):
    print("Starting...")
    while num > 0:
        yield num
        num -= 1


def task1():
    gen = task1_generator(5)
    while True:
        try:
            print(next(gen))
        except StopIteration:
            print("End!")
            break


# Task 2.
# Create generator expression.
def task2():
    data_gen = (x for x in range(10) if x % 2 == 0)
    print(data_gen)  # Output: <generator object .......>

    for i in data_gen:
        print(i)


# Task 3.
# Create function,
# that profile generator expression and list comprehension
def task3():
    num = int(1e6)

    data_list = [x for x in range(num)]
    print(sys.getsizeof(data_list))  # Output: 8448728

    data_gen = (x for x in range(num))
    print(sys.getsizeof(data_gen))  # Output: 112


print(b)
# python chapter-10(generator).py