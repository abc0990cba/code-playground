import numpy as np
import math
import matplotlib.pyplot as plt


def Explicit_2D(l1, l2, h1, h2, a, tau, T_):  # l2-y;l1-x
    n = int(2 * (l1 / h1))
    m = int(2 * (l2 / h2))
    K = int(T_ / tau)
    x = np.linspace(-l1, l1, n + 1)
    y = np.linspace(-l2, l2, m + 1)

    # Создаем двумерную матрицу-сетку
    xgrid, ygrid = np.meshgrid(x, y)
    prev = np.array(-(xgrid * xgrid + ygrid * ygrid))  # начальное распределение
    U = np.zeros((len(prev), len(prev)), float)
    for j in range(0, len(prev)):
        for i in range(0, len(prev)):
            U[j][i] = math.exp(prev[j][i])
    # В узлах рассчитываем значение функции
    T = []
    # U = borders(U)
    T.append(U)
    for k in range(0, K):
        z = np.zeros((21, 21), float)
        for j in range(1, m):
            for i in range(1, n):
                z[j][i] = T[k][j][i] + (tau * a ** 2) * ((
                                                                 (T[k][j][i + 1] - 2 * T[k][j][i] + T[k][j][i - 1]) / (
                                                                 h1 ** 2)) + (
                                                                 (T[k][j + 1][i] - 2 * T[k][j][i] + T[k][j - 1][i]) / (
                                                                 h2 ** 2)))
        T.append(z)

    return xgrid, ygrid, T


def two_dim_Heatcond():

    T_ = 40
    a = 0.1
    h1 = h2 = 0.1
    tau = 0.2
    l1 = 1
    l2 = 1
    K = int(T_ / tau)
    x, y, T = Explicit_2D(l1, l2, h1, h2, a, tau, T_)
    for k in [0, 1, 5, 10, K - 10, K - 1, K]:
        fig = plt.figure()
        plt.title(f"Explicit method : t={k * tau}c")
        axes = fig.add_subplot(projection='3d')
        axes.plot_surface(x, y, T[k], cmap='jet')
        plt.show()


two_dim_Heatcond()
