import numpy as np
import time
from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation

max_iterations = 20000


# t = 0
def initial_condition(xStart, xEnd):
    # Initialization.
    xStep = 0.01
    x0 = (xStart + xEnd) * 0.5
    x = np.arange(xStart, xEnd + xStep, xStep)

    xSize = len(x)

    gamma = 1.67

    # Velocity.
    u = np.empty(xSize)
    u.fill(0)

    # Pressure.
    p0 = 1
    r0 = 0.1
    p = np.empty(xSize)
    for i in range(xSize):
        p[i] = p0 * np.exp(-((x[i] - x0) ** 2) / (r0 ** 2))

    # Density.
    ro0 = 1
    ro = np.empty(xSize)
    ro.fill(ro0)

    energy = np.empty(xSize)
    energy.fill(p0 / (ro0 * (gamma - 1)))

    return x, u, p, ro, energy, gamma, xSize


# Plot configuration.

# Enable interactive mode
plt.ion()

fig, (axU, axP, axRo, axEnergy) = plt.subplots(4)

x_start = 0
x_end = 1
y_start = -0.65
y_end = 0.65

font_size = 14
plt.rcParams['font.size'] = font_size

axU.set_xlim(x_start, x_end)
axU.set_ylim(y_start, y_end)
axU.set_ylabel('velocity', fontsize=font_size)

y_start = 0
y_end = 2
axEnergy.set_xlim(x_start, x_end)
axEnergy.set_ylim(y_start, y_end)
axEnergy.set_ylabel('energy', fontsize=font_size)

y_start = 0.95
y_end = 1.05

axRo.set_xlim(x_start, x_end)
axRo.set_ylim(y_start, y_end)
axRo.set_ylabel('density', fontsize=font_size)

y_start = 0
y_end = 1

axP.set_xlim(x_start, x_end)
axP.set_ylim(y_start, y_end)
axP.set_ylabel('pressure', fontsize=font_size)

lineU, = axU.plot([], [], lw=1)
lineRo, = axRo.plot([], [], lw=1)
lineP, = axP.plot([], [], lw=1)
lineEnergy, = axEnergy.plot([], [], lw=1)

# Initial vars configuration.
x, u, p, ro, energy, gamma, xSize = initial_condition(x_start, x_end)

deltaX = x[1] - x[0]
deltaT = deltaX / 100

# Values for next time layer.
roNext = np.empty(xSize)
uNext = np.empty(xSize)
pNext = np.empty(xSize)
energyNext = np.empty(xSize)


def boundary_condition(u, p, ro, energy, xSize):
    # Hard boundary.
    u[0] = 0
    u[-1] = 0

    p[0] = p[1]
    p[-1] = p[-2]

    ro[0] = ro[1]
    ro[-1] = ro[-2]

    energy[0] = p[0] / (ro[0] * (gamma - 1))
    energy[-1] = p[-1] / (ro[-1] * (gamma - 1))

    return u, p, ro, energy


def non_conservative_schema_Lax_calculate(j):
    # Continuity equation.
    roNext[j] = (0.5 * (ro[j + 1] + ro[j - 1])
                 - u[j] * (deltaT / (2 * deltaX)) * (ro[j + 1] - ro[j - 1])
                 - ((deltaT * ro[j]) / (2 * deltaX)) * (u[j + 1] - u[j - 1]))

    # Movement equataion.
    uNext[j] = (0.5 * (u[j + 1] + u[j - 1])
                - u[j] * (deltaT / (2 * deltaX)) * (u[j + 1] - u[j - 1])
                - (deltaT / (2 * deltaX * ro[j])) * (p[j + 1] - p[j - 1]))

    # Pressure.
    pNext[j] = (0.5 * (p[j + 1] + p[j - 1])
                - u[j] * (deltaT / (2 * deltaX)) * (p[j + 1] - p[j - 1])
                - ((deltaT * gamma * p[j]) / (2 * deltaX)) * (u[j + 1] - u[j - 1]))

    # Energy
    energyNext[j] = p[j] / (ro[j] * (gamma - 1))


# Upwind schema.
def upwind_schema_calculate(j, deltaT, alpha0=1):
    alpha = alpha0
    if u[j] > 0:
        alpha = 0
    else:
        alpha = alpha0

    # Continuity equation.
    roNext[j] = (
            ro[j]
            - (1 - alpha) * u[j] * (deltaT / deltaX) * (ro[j] - ro[j - 1])
            - alpha * u[j] * (deltaT / deltaX) * (ro[j + 1] - ro[j])
            - ro[j] * (deltaT / (2 * deltaX)) * (u[j + 1] - u[j - 1])
    )

    # Movement equataion.
    uNext[j] = (
            u[j]
            - (1 - alpha) * u[j] * (deltaT / deltaX) * (u[j] - u[j - 1])
            - alpha * u[j] * (deltaT / deltaX) * (u[j + 1] - u[j])
            - (deltaT / (2 * deltaX * ro[j])) * (p[j + 1] - p[j - 1])
    )

    # Pressure.
    pNext[j] = (
            p[j]
            - (1 - alpha) * u[j] * (deltaT / deltaX) * (p[j] - p[j - 1])
            - alpha * u[j] * (deltaT / deltaX) * (p[j + 1] - p[j])
            - gamma * p[j] * (deltaT / (2 * deltaX)) * (u[j + 1] - u[j - 1])
    )

    # Energy
    energyNext[j] = p[j] / (ro[j] * (gamma - 1))


# Upwind schema.
def conservative_schema_Lax_calculate(j, deltaT):
    # Continuity equation.
    roNext[j] = (
            0.5 * (ro[j + 1] - ro[j - 1])
            - (deltaT / (2 * deltaX)) * (ro[j + 1] * u[j + 1] - ro[j - 1] * u[j - 1])
    )
    print(roNext)

    # Movement equation.
    uNext[j] = (
                       0.5 * (ro[j + 1] * u[j + 1] - ro[j - 1] * u[j - 1])
                       - (deltaT / (2 * deltaX))
                       * (ro[j + 1] * (u[j + 1] * u[j + 1]) + p[j + 1] - ro[j - 1] * (u[j - 1] * u[j - 1]) - p[j - 1])
               ) / roNext[j]

    # Energy
    energyNext[j] = (
            (0.5 * (ro[j + 1] * (energy[j + 1] + 0.5 * (u[j + 1] * u[j + 1]))
                    + ro[j - 1] * (energy[j - 1] + 0.5 * (u[j - 1] * u[j - 1])))
             - (deltaT / (2 * deltaX))
             * ((ro[j + 1] * energy[j + 1] + p[j + 1] + 0.5 * ro[j + 1] * (u[j + 1] * u[j + 1])) * u[j + 1]
                - (ro[j - 1] * energy[j - 1] + p[j - 1] + 0.5 * ro[j - 1] * (u[j - 1] * u[j - 1])) * u[j - 1]))
            / roNext[j]
            - 0.5 * (uNext[j] * uNext[j])
    )

    # Pressure.
    pNext[j] = roNext[j] * (gamma - 1) * energyNext[j]


for time_step in range(1, max_iterations):

    for j in range(1, xSize - 1):
        # for j in range(1,3):
        # Courant stability condition.
        # deltaT = deltaX / (np.absolute(u[j]) + np.sqrt(gamma * p[j] / ro[j]))

        # Lax non-conservative schema.
        non_conservative_schema_Lax_calculate(j)

        # Upwind schema.
        #upwind_schema_calculate(j, deltaT, alpha0=1)

        # Lax conservative schema. !! NOT WORKING !!!
        #conservative_schema_Lax_calculate(j, deltaT)

    p = np.copy(pNext)
    u = np.copy(uNext)
    ro = np.copy(roNext)
    energy = np.copy(energyNext)

    u, p, ro, energy = boundary_condition(u, p, ro, energy, xSize)

    pass_step = 10
    if (time_step % pass_step == 0):
        # Update plot data.
        axU.set_ylim(u.min(), u.max())
        lineU.set_data(x, u)

        axEnergy.set_ylim(energy[1:-1].min(), energy[1:-1].max())
        lineEnergy.set_data(x, energy)

        axP.set_ylim(p.min(), p.max())
        lineP.set_data(x, p)

        axRo.set_ylim(ro.min(), ro.max())
        lineRo.set_data(x, ro)

        fig.suptitle('Iteration step = {}. Non-conservative Lax scheme'.format(time_step))

        # re-drawing the figure
        fig.canvas.draw()

        # to flush the GUI events
        fig.canvas.flush_events()

        if time_step >= 500:
            time.sleep(10)
