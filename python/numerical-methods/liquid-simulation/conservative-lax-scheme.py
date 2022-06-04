import numpy as np
from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation
import time

def density_initial(n, ro_0):
    ro = np.full((n + 1), ro_0)
    return ro


def velocity_initial(n):
    u = np.zeros((n + 1))
    return u


def pressure_calculate(x, P0=1, x0=0.5, r0=0.1):
    return P0 * np.exp(-((x - x0) ** 2 / r0 ** 2))


def pressure_initial(a, b, n):
    coord = np.linspace(a, b, n + 1)
    return np.array(list(map(pressure_calculate, coord)))


def density_calculate(n, tau, h, u_n, ro_n):
    ro3 = np.zeros((n + 1))
    ro3[:] = ro_n[:]
    ro3[1:n] = 0.5 * (ro_n[2:n + 1] + ro_n[0:n - 1]) - (tau / (2 * h)) * (
            ro_n[2:n + 1] * u_n[2:n + 1] - ro_n[0:n - 1] * u_n[0:n - 1])

    # Boundary condition.
    ro3[n] = ro3[n - 1]
    ro3[0] = ro3[1]
    return ro3


def velocity_calculate(n, tau, h, ro_n, u_n, p_n, ro_next):
    u3 = np.zeros((n + 1))
    u3[:] = u_n[:]
    u3[1:n] = (0.5 * (ro_n[2:n + 1] * u_n[2:n + 1] + ro_n[0:n - 1] * u_n[0:n - 1]) - (tau / (2 * h)) * (
            ro_n[2:n + 1] * u_n[2:n + 1] ** 2 + p_n[2:n + 1] - ro_n[0:n - 1] * u_n[0:n - 1] ** 2 - p_n[
                                                                                                   0:n - 1])) / ro_next[
                                                                                                                1:n]
    return u3


def energy_calculate(gamma, n, tau, h, ro_n, u_n, p_n, E_n, ro_next, u_next):
    E = np.zeros((n + 1))
    E[:] = E_n[:]
    E[1:n] = ((0.5 * (ro_n[2:n + 1] * (E_n[2:n + 1] + 0.5 * u_n[2:n + 1] ** 2) + ro_n[0:n - 1] * (
            E_n[0:n - 1] + 0.5 * u_n[0:n - 1] ** 2)) - (tau / (2 * h)) * (
                        (ro_n[2:n + 1] * E_n[2:n + 1] + p_n[2:n + 1] + 0.5 * ro_n[2:n + 1] * u_n[2:n + 1] ** 2) * u_n[
                                                                                                                   2:n + 1] - (
                                ro_n[0:n - 1] * E_n[0:n - 1] + p_n[0:n - 1] + 0.5 * ro_n[0:n - 1] * u_n[
                                                                                                     0:n - 1] ** 2) * u_n[
                                                                                                                      0:n - 1])) / ro_next[
                                                                                                                                   1:n]) - 0.5 * u_next[
                                                                                                                                    1:n] ** 2
    # Boundary condition.
    E[n] = E[n - 1]
    E[0] = E[1]
    return E


def animate_plot(x_start, x_end, n, time_steps, result1, label1, result2, label2, result3, label3, result4, label4):

    fig, (ax1, ax2, ax3, ax4) = plt.subplots(4)

    y_min = min(map(min, result1))
    y_max = max(map(max, result1))
    ax1.set_xlim(x_start, x_end)
    ax1.set_ylim(y_min, y_max)
    font_size = 14
    ax1.set_ylabel(label1, fontsize=font_size)

    y_min = min(map(min, result2))
    y_max = max(map(max, result2))
    ax2.set_xlim(x_start, x_end)
    ax2.set_ylim(y_min, y_max)
    font_size = 14
    ax2.set_ylabel(label2, fontsize=font_size)

    y_min = min(map(min, result3))
    y_max = max(map(max, result3))
    ax3.set_xlim(x_start, x_end)
    ax3.set_ylim(y_min, y_max)
    font_size = 14
    ax3.set_ylabel(label3, fontsize=font_size)

    y_min = min(map(min, result4))
    y_max = max(map(max, result4))
    ax4.set_xlim(x_start, x_end)
    ax4.set_ylim(y_min, y_max)
    font_size = 14
    ax4.set_ylabel(label4, fontsize=font_size)

    line1, = ax1.plot([], [], lw=1)
    line2, = ax2.plot([], [], lw=1)
    line3, = ax3.plot([], [], lw=1)
    line4, = ax4.plot([], [], lw=1)

    def init():
        line1.set_data([], [])
        line2.set_data([], [])
        line3.set_data([], [])
        line4.set_data([], [])
        return line1, line2, line3, line4

    def animate(time_step):
        x = np.linspace(x_start, x_end, n + 1)
        line1.set_data(x, result1[time_step])
        line2.set_data(x, result2[time_step])
        line3.set_data(x, result3[time_step])
        line4.set_data(x, result4[time_step])

        fig.suptitle('Iteration step = {}. Conservative Lax scheme'.format(time_step))

        if time_step >= 502:
            time.sleep(10)
        return line1, line2, line3, line4,

    anim = FuncAnimation(fig, animate, init_func=init,
                         frames=time_steps, interval=0.01)
    plt.show()


def main():
    # a <= x <= b
    a = 0
    b = 1

    time_steps = 1000

    # Coordinate grid size.
    x_size = 100

    # Step size.
    h = (b - a) / x_size

    gamma = 1.67

    p_n = pressure_initial(a, b, x_size)
    u_n = velocity_initial(x_size)
    ro_n = density_initial(x_size, 1)
    E_n = np.zeros((x_size + 1))
    E_n[:] = p_n[:] / (ro_n[:] * (gamma - 1))

    # Array of all time layers.
    energy_all = np.zeros((time_steps + 1, x_size + 1))
    p_all = np.zeros((time_steps + 1, x_size + 1))
    u_all = np.zeros((time_steps + 1, x_size + 1))
    ro_all = np.zeros((time_steps + 1, x_size + 1))

    # Initial conditions at the zero time layer.
    p_all[0, :] = p_n[:]
    u_all[0, :] = u_n[:]
    ro_all[0, :] = ro_n[:]

    # Conservative Lax scheme.
    # Time step.
    tau = 0.0001
    for k in range(0, time_steps):

        ro = density_calculate(x_size, tau, h, u_n, ro_n)
        u = velocity_calculate(x_size, tau, h, ro_n, u_n, p_n, ro)
        energy = energy_calculate(gamma, x_size, tau, h, ro_n, u_n, p_n, E_n, ro, u)

        energy_all[k + 1, :] = energy[:]
        u_all[k + 1, :] = u[:]
        ro_all[k + 1, :] = ro[:]
        p_n[:] = p_all[k + 1, :] = energy[:] * ro[:] * (gamma - 1)

        ro_n = ro
        u_n = u
        E_n = energy

    animate_plot(a, b, x_size, time_steps, u_all, "Velocity", p_all, "Pressure",  ro_all, "Density", energy_all, "Energy")



main()
