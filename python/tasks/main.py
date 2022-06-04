


import math


def phi(x):
    return 2 - math.log(10, abs(x))

eps = 10e-8
x0 = 0.5
q = 0.5



# Aitken's method
def aitken_method(x0):

    x1 = phi(x0)
    x2 = phi(x1)
    iterCount = 0

    ksi = None;
    x3 = None;

    while True:
        xTilda = (x0 * x2 - x1 * x1) / (x2 - 2*x1 + x0)
        x3 = phi(xTilda)

        if abs(x3 - xTilda) > ((1 - q) * eps / q):
            x0 = xTilda
            x1 = x3
            x2 = phi(x1)
            iterCount = iterCount + 1
        else:
            ksi = x3
            break
    return iterCount, ksi


print("AITKEN")
print(" x=0.5:  ", aitken_method(0.5))
print(" x=1.8:  ", aitken_method(1.8))
print(" x=4:  ", aitken_method(4))



# Vegstein's method
def vegstein_method(x0):
    x1 = phi(x0)
    x0Kr = x0
    x1Kr = x1

    iterCount = 0

    ksi = None;
    x3 = None;

    while True:
        x2 = phi(x1Kr)

        if abs(x2 - x1Kr) > ((1 - q) * eps / q):
            x2Kr = (x2*x0Kr - x1*x1Kr) / (x2 + x0Kr - x1 -x1Kr)
            x0Kr = x1Kr
            x1 = x2
            x1Kr = x2Kr
            iterCount = iterCount + 1
        else:
            ksi = x2
            break
    return iterCount, ksi

print("Vegstein")
print(" x=0.5:  ", vegstein_method(0.5))
print(" x=1.8:  ", vegstein_method(1.8))
print(" x=4:  ", vegstein_method(4))

# Fixedpoint method

def fixed_Point_method(x0):
    iterCount = 0
    ksi = None
    while True:
        delta = phi(x0)
        iterCount = iterCount + 1
        if abs(x0 - delta) > ((1 - q) * eps / q):
            x0 = delta
        else:
            ksi = delta
            break

    print("Fixed point", iterCount, ksi)