import math

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from scipy import optimize
import numpy as np


# Solving the system of equations
# by the implicit Euler method
# on the interval: [a,b] = [0,0.1]
# with a step(tau): 0.001, 0.002, 0.0025.

def calculate_error(analitical, numerical):
    error = []
    for i in range(len(numerical)):
        error.append(abs(analitical[i] - numerical[i]))
    return np.array(error)


# Drawing charts.
# def draw_chart(method_name, tau, y, z, t, interval=[0, 0.1, -3, 5]):
def draw_chart(method_name, n, tau, y, z, t, a, b, interval=[0, 0.1, -2.3, 4.5]):
    # *10 and /10 for better analitical picture.
    u, anal_t = analitical(n * 30, tau / 30)
    anal_y = u[:, 0]
    anal_z = u[:, 1]

    print(anal_y)


    # Drawing charts.
    fig, ax = plt.subplots()
    y_decision_line, z_decision_line, y_anal_line, z_anal_line = plt.plot(t, y, t, z, anal_t, anal_y, anal_t, anal_z)
    plt.axis(interval)

    fig.legend((y_decision_line, z_decision_line, y_anal_line, z_anal_line),
               ('$y$', '$z$', '$analitic y$', '$analitic z$'))
    plt.xlabel('t')
    tau_patch = mpatches.Patch(label=method_name + ' method with tau=' + str(tau))
    ax.legend(handles=[tau_patch], loc='upper right')

    plt.show()

    # Draw error.
    fig, ax = plt.subplots()

    u, anal_t = analitical(n, tau)
    anal_y = u[:, 0]
    anal_z = u[:, 1]
    y_error = calculate_error(anal_y, y)
    z_error = calculate_error(anal_z, z)

    y_error_line, z_error_line = plt.plot(t, y_error, t, z_error)

    interval = [0, 0.1, 0, 1]
    plt.axis(interval)

    plt.xlabel('t')
    fig.legend((y_error_line, z_error_line),
               ('$y-error$', '$z-error$'))
    error_patch = mpatches.Patch(label="Error between analitical and " + method_name + ' method with tau=' + str(tau))
    ax.legend(handles=[error_patch], loc='upper right')

    plt.show()


# system - list of ode
# u0, u1 - initial point
# tau - step
# n - number of sections
def gear_second_order(system, u0, u1, tau, n):
    # Transformation for numpy calcualtions.
    f_np = lambda u: np.asarray(system(u))

    # Decision array.
    u = np.zeros((n + 1, len(u0)))
    u[0] = np.array(u0)
    u[1] = np.array(u1)

    # Numerical scheme.
    # next     - i+1
    # current  - i
    # previous - i-1
    def f(next, current, previous):
        return 3 * next - 2 * tau * f_np(next) - 4 * current + previous

    for i in range(1, n):
        u[i + 1] = optimize.fsolve(f, u[i - 1], args=(u[i], u[i - 1]))
    return u


# system - list of ode
# u0, u1, u2, u3 - initial point
# tau - step
# n - number of sections
def gear_fourth_order(system, u0, u1, u2, u3, tau, n):
    # Transformation for numpy calcualtions.
    f_np = lambda u: np.asarray(system(u))

    # Decision array.
    u = np.zeros((n + 1, len(u0)))
    u[0] = np.array(u0)
    u[1] = np.array(u1)
    u[2] = np.array(u2)
    u[3] = np.array(u3)

    # Numerical scheme.
    # next     - i+1
    # current  - i
    # previous - i-1
    # previous_2 - i-2
    # previous_3 - i-3
    def f(next, current, previous, previous_2, previous_3):
        return 25 * next - 12 * tau * f_np(next) - 48 * current + 36 * previous - 16 * previous_2 + 3 * previous_3

    for i in range(3, n):
        u[i + 1] = optimize.fsolve(f, u[i], args=(u[i], u[i - 1], u[i - 2], u[i - 3]))

    return u


# system - list of ode
# u0 - initial point
# tau - step
# n - number of sections
def explicit_euler(system, u0, tau, n):
    # Transformation for numpy calcualtions.
    f_np = lambda u: np.asarray(system(u))

    # Decision array.
    u = np.zeros((n + 1, len(u0)))
    u[0] = np.array(u0)

    # Numerical scheme.
    for i in range(n):
        u[i + 1] = u[i] + tau * f_np(u[i])
    return u


def analitical(n, tau=0.001):
    def F(t):
        return [4 * math.exp(-t) - 3 * math.exp(-1000 * t), -2 * math.exp(-t) + 3 * math.exp(-1000 * t)]
        # return [math.exp(-t), 100*math.exp(-t)-99]

    # n = int(round(n / tau))
    F_ = lambda t: np.asarray(F(t))

    t = np.empty(n + 1)
    for i in range(n + 1):
        t[i] = i * tau
    t = np.array(t)
    u = np.zeros((n + 1, 2))
    # u[0] = np.array(u0)

    for i in range(n + 1):
        # u[i] = F_(t[i])
        u[i] = F_(t[i])
    return u, t


# system - list of ode
# u0 - initial point
# tau - step
# n - number of sections
def implicit_euler(system, u0, tau, n):
    # Transformation for numpy calcualtions.
    f_np = lambda u: np.asarray(system(u))

    # Decision array.
    u = np.zeros((n + 1, len(u0)))
    u[0] = np.array(u0)

    # Numerical scheme.
    def f(current, prev):
        return current - tau * f_np(current) - prev

    # optimize.fsolve return the roots of the (non-linear) equations
    # defined by func(x) = 0 given a starting estimate.
    for i in range(n):
        u[i + 1] = optimize.fsolve(f, u[i], args=(u[i]))
    return u


# system - list of ode
# u0 - initial point
# tau - step
# n - number of sections
def modified_euler(system, u0, tau, n):
    # Transformation for numpy calcualtions.
    f_np = lambda u: np.asarray(system(u))

    # Decision array.
    u = np.zeros((n + 1, len(u0)))
    u[0] = np.array(u0)

    for i in range(n):
        u[i + 1] = u[i] + tau * f_np(u[i])
        u[i + 1] = u[i] + tau * (f_np(u[i]) + f_np(u[i + 1])) / 2
    return u


# ode - ordinary differential equation.
# tau - step
def solve_ode_system(tau):
    def system(u):
        y, z = u
        return [998 * y + 1998 * z, -999 * y - 1999 * z]

    # Interval: [a,b] = [0,0.1].
    a = 0
    b = 0.1

    # Number of sections.
    n = int((b - a) / tau)

    # Time array.
    t = np.empty(n + 1)
    for i in range(n + 1):
        t[i] = i * tau
    t = np.array(t)

    # Initial conditions.
    u0 = [1, 1]

    # Initial conditions.
    # For gear 2-nd order
    # u1 = [3.68766877, -1.70747075]

    # u, t = explicit_euler(system, u0, tau, n)
    # y = u[:, 0]
    # z = u[:, 1]
    # draw_chart("Explicit Euler", n, tau, y, z, t, a, b)

    u = implicit_euler(system, u0, tau, n)

    # Initial conditions.
    # For gear 2-nd and 4-nd order
    u1 = u[1]
    u2 = u[2]
    u3 = u[3]
    # y = u[:, 0]
    # z = u[:, 1]
    # draw_chart("Implicit Euler", n, tau, y, z, t, a, b)

    # u = modified_euler(system, u0, tau, n)
    # y = u[:, 0]
    # z = u[:, 1]
    # draw_chart("Modified Euler", n, tau, y, z, t, a, b)

    # u = gear_second_order(system, u0, u1, tau, n)
    # y = u[:, 0]
    # z = u[:, 1]
    # draw_chart("Gear(2-th order)", n, tau, y, z, t, a, b)

    u = gear_fourth_order(system, u0, u1, u2, u3, tau, n)
    y = u[:, 0]
    z = u[:, 1]
    draw_chart("Gear(4-th order)", n, tau, y, z, t, a, b)

    # draw_chart("Explicit Euler", tau, y, z, t, a, b)

    # draw_chart("Gear(2-nd order)", tau, y, z, t,a,b)


solve_ode_system(0.0025)
