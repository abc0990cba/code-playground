import math
import numpy as np
import matplotlib.pyplot as plt


def normal_distribution(m=0, v=1):
    a = -1;
    b = 1;
    s = 0
    while s == 0 or s > 1:
        x, y = a + np.random.random(2) * (b - a)
        s = x * x + y * y
    return v * (x * math.sqrt(-2 * math.log(s) / s)) + m


def Fsin(x, U0, L, dzetta):
    return U0 * 2 * math.pi / (L * dzetta) * math.cos(2 * math.pi * x / L)


def moment(a):
    moment = 0
    # enumerate return tuple (index, element)
    for index, x in enumerate(a):
        moment += (x - moment) / (index + 1)
    return moment


# dzetta - viscosity
@np.vectorize
def rho(x, t,  F, D=1, dzetta=1):
    return 1 / 2 / math.sqrt(math.pi * D * t) * math.exp(-(x + F * t / dzetta) ** 2 / 4 / D / t)
    # return 1/2/math.sqrt(math.pi*D*t) * math.exp(-(x+5*t/dzetta)**2 /4/D/t)

# Number of trajectories.
N = 1e4

# Number of time steps.
n_steps = 20

t_start = 0
t_end = 1
tau = (t_end - t_start) / n_steps
x0 = 0

# Constant potential.
U0 = 3

# Space scale.
L = 0.01
def calculate_x_res(F):
    x_result = []
    for i in np.arange(N):
        x = [x0];
        # Dimensionless discrete analogue of the free diffusion equation.
        for i in np.arange(1, n_steps):
            x.append(x[-1] + math.sqrt(2 * tau) * normal_distribution() - tau*F)
        x_result.append(np.array(x))
    return x_result

x_result = np.array(calculate_x_res(0))



time_list = np.linspace(t_start, t_end, n_steps)

def calculate_moments(x_result):
    # mean - <x>
    moment1 = np.apply_along_axis(moment, 0, x_result)

    # dispersion
    moment2 = moment(np.power(x_result - moment1, 2))

    moment3 = moment(np.power(x_result - moment1, 3))
    moment4 = moment(np.power(x_result - moment1, 4))

    return moment1, moment2, moment3, moment4


def draw_trajectories(x_result, time_list, moment1, moment2):
    plt.close('all')
    plt.figure(figsize=(10, 8))

    # Draw moments and trajectories.
    for d in x_result:
        plt.plot(time_list, d, color='grey', linewidth=1)
    plt.plot(time_list, moment1, linewidth=3, label='moment(1 order)')
    plt.plot(time_list, moment2, linewidth=3, label='moment(2 order)')
    plt.legend()
    plt.grid(True, which='both')
    plt.show()


# Histogram and envelope.
def draw_histogram_and_envelope(x_result, n_steps, rho, tau, F):
    for i in range(4, x_result.shape[1], int(n_steps / 2)):
        count, bins, ignored = plt.hist(x_result[:, i], density=True, bins=50)  # bins - number of columns
        plt.plot(bins, rho(bins, i * tau, F))
        plt.show()

moment1, moment2, _, _ = calculate_moments(x_result)
draw_trajectories(x_result, time_list, moment1, moment2)
draw_histogram_and_envelope(x_result, n_steps, rho, tau, 0)

diffusion_coeff_imperical = moment2[-1] / (2 * t_end)
print("Imperical diffusion coefficient: ", diffusion_coeff_imperical)


# Task 2.
def check_number_of_trajectrories_to_zero():
    number_of_trajectrories_to_zero = 1e3
    while not np.allclose(moment3, np.zeros(moment3.shape), rtol=1e-01, atol=1e-01):
        x_result = []
        for _ in np.arange(number_of_trajectrories_to_zero):
            x = [x0]
            # Dimensionless discrete analogue of the free diffusion equation.
            for _ in np.arange(1, n_steps):
                x.append(x[-1] + math.sqrt(2 * tau) * normal_distribution())
            x_result.append(np.array(x))

        x_result = np.array(x_result)

        moment1 = np.apply_along_axis(moment, 0, x_result)
        moment3 = moment(np.power(x_result - moment1, 3))
        number_of_trajectrories_to_zero = number_of_trajectrories_to_zero + 100

    print("Number of trajectories to zero moment(order 3): ", number_of_trajectrories_to_zero)


# Task 4.
# With force=const.
F = 3
x_result = np.array(calculate_x_res(F))
moment1, moment2, _, _ = calculate_moments(x_result)
# draw_trajectories(x_result, time_list, moment1, moment2)
# draw_histogram_and_envelope(x_result, n_steps, rho, tau, F)