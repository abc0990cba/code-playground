# Chapter 9.
# OOP.

# Task 1.
# Create a Vehicle class with name, max_speed and mileage instance attributes
# and method "seating_capacity".
class Vehicle:
    def __init__(self, name, max_speed, mileage):
        self.name = name
        self.max_speed = max_speed
        self.mileage = mileage

    def seating_capacity(self, capacity):
        return f"The seating capacity of a {self.name} is {capacity} passengers"


# Task 2.
# Create a Bubble class without any variables and methods.
class Bubble:
    pass


# Task 3.
# Create a child class Bus that will inherit
# all of the variables and methods
# of the Vehicle class
class Bus(Vehicle):
    pass


# Task 4.
# Create a Car class that inherits from the Vehicle class.
# Give the capacity argument
# of Car.seating_capacity() a default value of 50.
class Car(Vehicle):
    def seating_capacity(self, capacity=50):
        return super().seating_capacity(capacity)


# Task 5.
# Define property that should have the same value for every class instance
class Shape:
    color = "red"

    def __init__(self, shape_type):
        self.shape_type = shape_type


# Task 6.
# Create a Bus2 child class that inherits from the Vehicle class.
# The default fare charge of any vehicle is seating capacity * 100.
# If Vehicle is Bus instance, we need to add an
# extra 10% on full fare as a maintenance charge.
# So total fare for bus instance will become
# the final amount = total fare + 10% of the total fare.
#
# Note: The bus seating capacity is 50.
# So the final fare amount should be 5500.
# You need to override the fare() method of a Vehicle class in Bus class.
class Vehicle2:
    def __init__(self, name, mileage, capacity):
        self.name = name
        self.mileage = mileage
        self.capacity = capacity

    def fare(self):
        return self.capacity * 100


class Bus2(Vehicle2):
    def fare(self):
        amount = super().fare()
        amount += amount * 0.1
        return amount


# Task 7.
# Determine which class a given Bus2
# object belongs to (check type of an object).
def task7(o):
    return type(o)


# Task 8.
# Determine if "car" is also an instance of the Vehicle2 class
def task8(o):
    return isinstance(o, Vehicle2)


# Task 9.
# Create class "Person" with fields name, age using getters and setters.
# Using __str__, __repr__

class Person:
    def __init__(self, name, age):
        try:
            if 0 < len(name) <= 40:
                self.__name = name
            else:
                raise ValueError("Incorrect name!")

            if 0 < age <= 140:
                self.__age = age
            else:
                raise ValueError("Incorrect age!")
        except ValueError as e:
            print(e)

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, new_name):
        try:
            if 0 < len(new_name) <= 40:
                self.__name = new_name
            else:
                raise ValueError("Incorrect name!")
        except ValueError as e:
            print(e)

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, new_age):
        try:
            if 1 < new_age < 140:
                self.__age = new_age
            else:
                raise ValueError("Incorrect age")
        except ValueError as e:
            print(e)

    def __str__(self):
        return "Person(name: {})".format(self.__name, self.__age)

    def __repr__(self):
        return "Person(name: {}, age: {})".format(self.__name, self.__age)

mark = Person("mark", 30)
t = (mark,)
print(mark)

# python chapter-9(OOP).py


