import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import math

# начальные и граничные условия
uCoeff = 1
timeEnd = 10
columns = 100
a = 0
b = 10
length = b - a


def init_condition(x):
    if 1 < x < 3:
        if math.cos(math.pi * x) > 0:
            return math.cos(math.pi * x)
        else:
            return 0
    else:
        return 0


def first_border(t):
    return 0
    # return math.cos(- math.pi * t)



def second_border(t):
    return 0
    # return math.cos(math.pi * t)


def set_init_params(c):

    # h - coordinate step
    h = length / columns

    # tau - time step
    tau = h * c / uCoeff

    # rows - time layers number
    rows = int(timeEnd / tau)
    rows = 1000

    # U - approximation matrix
    U = np.zeros((rows + 1, columns + 1))

    for i in range(1, columns):
        U[0][i] = init_condition(i * h)

    for i in range(rows + 1):
        U[i][0] = first_border(i * tau)
        U[i][columns] = second_border(i * tau)

    return h, tau, rows, U


def ftcs_method(c):
    h, tau, rows, U = set_init_params(c)

    for k in range(rows):
        for j in range(1, columns):
            U[k + 1][j] = U[k][j] - c * (U[k][j + 1] - U[k][j - 1]) / 2
    return U, tau


def laxwendroff_method(c):
    h, tau, rows, U = set_init_params(c)

    for k in range(rows):
        for j in range(1, columns):
            U[k + 1][j] = U[k][j] - c * (U[k][j + 1] - U[k][j - 1]) / 2 + c ** 2 * (U[k][j + 1] -
                                                                                    2 * U[k][j] + U[k][j - 1]) / 2
    return U, tau




def richtmayer_method(c):
    h, tau, rows, U = set_init_params(c)

    for i in range(1,rows-1):
        # prev_value = (U[i][1] + U[i][0]) / 2 - c * (U[i][1] - U[i][0]) / 2
        for j in range(2, columns):
            # next_value = (U[i][j + 1] + U[i][j]) / 2 - c * (U[i][j + 1] - U[i][j]) / 2
            # U[i + 1][j] = U[i][j] - c * (next_value - prev_value)
            # prev_value = next_value
            U[i + 1][j] = (U[i][j + 1] + U[i][j - 1]) / 2 - (c / 2) * (U[i][j + 1] + U[i][j - 1])
            U[i + 2][j] =  U[i][j]   - c* (U[i+1][j + 1] - U[i+1][j - 1])
        return U, tau


def mccormack_method(c):
    h, tau, rows, U = set_init_params(c)
    Uline = np.zeros((rows + 1, columns + 1))

    for i in range(0, columns):
        U[0][i] = init_condition(i * h)
    for i in range(rows + 1):
        U[i][0] = first_border(i * tau)
        U[i][columns] = second_border(i * tau)
    for k in range(rows):
        for j in range(1, columns):
            Uline[k + 1][j] = U[k][j] - c * (U[k][j + 1] - U[k][j])
            U[k + 1][j] = (U[k][j] + Uline[k + 1][j] - c * (Uline[k + 1][j] - Uline[k + 1][j - 1])) / 2
    return U, tau


def upwind_first_order_method(c):
    h, tau, rows, U = set_init_params(c)

    for k in range(rows):
        for j in range(1, columns):
            U[k + 1][j] = U[k][j] - c * (U[k][j] - U[k][j - 1])
    return U, tau


def upwind_second_order_method(c):
    h, tau, rows, U = set_init_params(c)

    for i in range(1, rows + 1):
        U[i][1] = U[i - 1][1] - c * (U[i - 1][1] - U[i - 1][0])
    for k in range(rows):
        for j in range(2, columns):
            U[k + 1][j] = U[k][j] - c * (U[k][j] - U[k][j - 1]) - c * (1 - c) * (
                    U[k][j] - 2 * U[k][j - 1] + U[k][j - 2]) / 2
    return U, tau


# Drawing charts.
# def draw_chart(method_name, tau, y, z, t, interval=[0, 0.1, -3, 5]):
def draw_chart(x, y, c, time, methodName, a=0, b=10):
    interval = [a, b, 0 - 0.5, 1 + 0.5]

    # Drawing charts.
    fig, ax = plt.subplots()
    chart_line = plt.plot(x, y)
    plt.axis(interval)

    fig.legend((chart_line),
               ('$y$'))
    plt.xlabel('t')
    method_patch = mpatches.Patch(label=' method ' + methodName + ' with c=' + str(c))
    time_patch = mpatches.Patch(label=' time=' + str(time))
    ax.legend(handles=[method_patch, time_patch], loc='upper right')

    plt.show()


# c - convection number.
def draw_all(c):
    time_moments_i = [0, 2, 10, 35, 55]
    # map(lambda i: int(i*c), time_moments_i)

    for time_i in time_moments_i:
        # U, tau = richtmayer_method(c)
        # U, tau = ftcs_method(c)
        # U, tau = laxwendroff_method(c)
        U, tau = mccormack_method(c)
        # U, tau = upwind_first_order_method(c)
        # U, tau = upwind_second_order_method(c)
        n = columns
        t = np.empty(n + 1)
        for i in range(n + 1):
            t[i] = i * tau * (1/c)

        time_layer = U[time_i]
        # draw_chart(t, time_layer, c, time=tau * time_i, methodName="richtmayer method")
        # draw_chart(t, time_layer, c, time=tau * time_i, methodName="ftcs_method")
        # draw_chart(t, time_layer, c, time=tau * time_i, methodName="laxwendroff_method")
        draw_chart(t, time_layer, c, time=tau * time_i, methodName="mccormack_method")
        # draw_chart(t, time_layer, c, time=tau * time_i, methodName="upwind_first_order_method")
        # draw_chart(t, time_layer, c, time=tau * time_i, methodName="upwind_second_order_method")

draw_all(c=1.0)