import math
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches


def p1(t):
    return t


def p2(t):
    return 1


def q1(t):
    return 1 / (t ** 2)


def q2(t):
    return 1


def p1q2(t):
    return t


def p1q1(t):
    return 1 / t


def f(t):
    return t ** 2 + t / 6 - 7 / 3


n = 2
lam = -1.0


def cacl(C11, C12, C21, C22, D1, D2):
    A = [[0 for i in range(n)] for j in range(n)]

    A[0][0] = 1 - C11
    A[0][1] = -C12
    A[1][0] = -C21
    A[1][1] = 1 - C22

    z2 = (D2 * A[0][0] - A[1][0] * D1) / (1 + A[0][1] - A[0][1] * A[1][0])
    z1 = (D1 - A[0][1] * z2) / A[0][0]

    return z1, z2


def print_result(x, N):
    for i in range(N + 1):
        print("t[" + str(i) + "] = " + str(t[i]) + "\t")
        print("X[" + str(i) + "] = " + str(x[i]) + "\n")
    print("\n")


def calculate_x(X, z1, z2, N):
    for i in range(N + 1):
        X[i] = lam * z1 * p1(t[i]) + lam * z2 * p2(t[i]) + f(t[i])
    return X


def trapezoidal_formula(X, N, h, t):
    C11 = 0
    C12 = 0
    C21 = 0
    C22 = 0
    D1 = 0
    D2 = 0
    for i in range(N):
        c11 = (h / 2) * (p1q1(t[i]) + p1q1(t[i + 1]))
        C11 += c11

        c12 = (h / 2) * (p1q2(t[i]) + p1q2(t[i + 1]))
        C12 += c12

        c21 = (h / 2) * (q1(t[i]) + q1(t[i + 1]))
        C21 += c21

        c22 = (h / 2) * (q2(t[i]) + q2(t[i + 1]))
        C22 += c22

        d1 = (h / 2) * (f(t[i]) * q1(t[i]) + f(t[i + 1]) * q1(t[i + 1]))
        D1 += d1

        d2 = (h / 2) * (f(t[i]) * q2(t[i]) + f(t[i + 1]) * q2(t[i + 1]))
        D2 += d2

    z1, z2 = cacl(C11, C12, C21, C22, D1, D2)
    print("N", N)
    X = calculate_x(X, z1, z2, N)
    print_result(X, N)

    return X


def exect_solution(X, N):
    for i in range(N + 1):
        X[i] = t[i] ** 2 - (5 / 3)

    print_result(X, N)
    return X


# Gauss formula
def gauss_formula(X, N, h, t):
    C11 = 0
    C12 = 0
    C21 = 0
    C22 = 0
    D1 = 0
    D2 = 0

    for i in range(N):
        c11 = (h / 2) * (p1(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) + p1(
            ((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))))
        C11 += c11
        # -------------------------------------------------------------------------------

        c12 = (h / 2) * (p1q2(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) + p1q2(
            ((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))))
        C12 += c12

        # -------------------------------------------------------------------------------

        c21 = (h / 2) * (q1(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) + q1(
            ((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))))
        C21 += c21

        # -------------------------------------------------------------------------------

        c22 = (h / 2) * (q2(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) + q2(
            ((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))))
        C22 += c22

        # -------------------------------------------------------------------------------

        d1 = (h / 2) * (f(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) * q1(
            ((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) +
                        f(((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) * q1(
                    ((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))))
        D1 += d1

        # -------------------------------------------------------------------------------
        d2 = (h / 2) * (((p1q2(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3))))) / 2) + (
                q2(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] - t[i]) / (2 * math.sqrt(3)))) / 6) +
                        ((p1q2(((t[i] + t[i + 1]) / 2.0) + ((t[i + 1] - t[i]) / (2 * math.sqrt(3))))) / 2) + (
                                q2(((t[i] + t[i + 1]) / 2.0) - ((t[i + 1] + t[i]) / (2 * math.sqrt(3)))) / 6))
        D2 += d2

    z1, z2 = cacl(C11, C12, C21, C22, D1, D2)
    X = calculate_x(X, z1, z2, N)
    print_result(X, N)

    return X


def draw_chart(exact, gauss, trapez, error_gauss, error_trapez, t, a, b, nodes_count):
    interval = [a - 0.5, b + 0.5, -1.2, 4]

    # Drawing charts.
    fig, ax = plt.subplots()
    exact, gauss, trapez = plt.plot(t, exact, t, gauss, t, trapez)
    plt.axis(interval)

    fig.legend((exact, gauss, trapez),
               ('$exact-solution$', '$gauss-formula$', '$trapezoidal-formula$'))
    plt.xlabel('t')

    tau_patch = mpatches.Patch(label='Fredholm integral equation for' + str(nodes_count) + " nodes")
    ax.legend(handles=[tau_patch], loc='upper left')

    plt.show()

    # Drawing approxiamtion errors.
    interval_error = [a - 0.5, b + 0.5, 0, 4]
    fig, ax = plt.subplots()
    error_gauss, error_trapez, = plt.plot(t, error_gauss, t, error_trapez)
    plt.axis(interval_error)

    fig.legend((error_gauss, error_trapez),
               ('$gauss-error$', '$trapezoidal-error$'))
    plt.xlabel('t')

    patch = mpatches.Patch(label="Approximation error for " + str(nodes_count) + " nodes")
    ax.legend(handles=[patch], loc='upper left')

    plt.show()


# Error between exact and approximate solutions.
def calculate_error(exact, approx, N):
    error = [0 for _ in range(N + 1)]
    for i in range(N + 1):
        error[i] = abs(exact[i] - approx[i])

    return error


# Decision boundary.
a = 1.0
b = 2.0

# Number of nodes.
N = 10

# Step size.
h = (b - a) / N

# Time array.
t = [0 for _ in range(N + 1)]
for i in range(N + 1):
    t[i] = a + i * h

print("Exact solution:\n")
x_exect = [0 for _ in range(N + 1)]
exact = exect_solution(x_exect, N)

x = [0 for _ in range(N + 1)]
print("Метод Трапеции:\n")
trapez = trapezoidal_formula(x, N, h, t)

x = [0 for _ in range(N + 1)]
print("Метод Гаусса:\n")
gauss = gauss_formula(x, N, h, t)

error_trapez = calculate_error(exact, trapez, N)
error_gauss = calculate_error(exact, gauss, N)

draw_chart(exact, gauss, trapez, error_gauss, error_trapez, t, a, b, N)
