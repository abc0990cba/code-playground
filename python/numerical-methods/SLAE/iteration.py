import math

def phi(x):
    #return x*math.log(x) - 5
    return 2 - math.log(x, 10)

def f(x):
    return phi(x) - x

# N - maximum step.
N = 200

# eps - tolerable Error.
eps = 10e-8

# x0 - Initial approximation list
x0 = [0.5, 1.8, 4]
#x0 =[0.5,0.5,0.5]
q = 1


# Aitken's method
def aitken_method(x0):

    x1 = phi(x0)
    x2 = phi(x1)
    step = 1
    ksi = None
    x3 = None

    while True:
        xTilda = (x0 * x2 - x1 * x1) / (x2 - 2*x1 + x0)
        x3 = phi(xTilda)

        if abs(x3 - xTilda) > ((1 - q) * eps / q):
            x0 = xTilda
            x1 = x3
            x2 = phi(x1)
            step = step + 1
        else:
            ksi = x3
            break
    return step, ksi


# Vegstein's method
def vegstein_method(x0):
    x1 = phi(x0)
    x0Kr = x0
    x1Kr = x1

    step = 1

    ksi = None;
    x3 = None;

    while True:
        x2 = phi(x1Kr)

        if abs(x2 - x1Kr) > ((1 - q) * eps / q):
            x2Kr = (x2*x0Kr - x1*x1Kr) / (x2 + x0Kr - x1 -x1Kr)
            x0Kr = x1Kr
            x1 = x2
            x1Kr = x2Kr
            step = step + 1
        else:
            ksi = x2
            break
    return step, ksi


# Fixed Point Iteration Method
def fixed_point_iteration(x0):
    step = 0
    flag = 1
    while True:
        x1 = phi(x0)
        x0 = x1

        step = step + 1

        if step > N:
            flag = 0
            break

        if not (abs(f(x1)) > eps):
            break

    if flag == 1:
        return step, x1
    else:
        print('\nNot Convergent.')


print("\nDelta-2 Aitken`s process:")
for x in x0:
    step, root = aitken_method(x)
    print("x0 = {:3.1f} \t iterations: {:d} \t root: {:10.8f}".format(x, step, root))


print("\nVegstein method:")
for x in x0:
    step, root = vegstein_method(x)
    print("x0 = {:3.1f} \t iterations: {:d} \t root: {:10.8f}".format(x, step, root))


print("\nFixed-point iteration method:")
for x in x0:
    step, root = fixed_point_iteration(x)
    print("x0 = {:3.1f} \t iterations: {:d} \t root: {:10.8f}".format(x, step, root))
