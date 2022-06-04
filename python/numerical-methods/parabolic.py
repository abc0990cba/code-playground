import matplotlib.pyplot as plt
import numpy as np
from matplotlib import cm
from scipy import sparse

def draw_chart(t_grid, x_grid, U, x_interval=[0, 0.25, 0.5, 0.75, 1.0], y_interval=[0, 0.05, 0.1]):
    # Draw chart.
    T, X = np.meshgrid(t_grid, x_grid)

    fig = plt.figure()
    ax = fig.add_subplot(projection='3d')

    ax.plot_surface(X, T, U, cmap=cm.coolwarm,
                    linewidth=0, antialiased=False)
    ax.set_xticks(x_interval)
    ax.set_yticks(y_interval)
    ax.set_xlabel('x')
    ax.set_ylabel('time')
    ax.set_zlabel('U')
    ax.view_init(elev=33, azim=36)
    plt.tight_layout()
    plt.show()



def draw_chart2(t_grid, x_grid, U, interval=[0, 0.2, 0, 1.0]):

    # Drawing charts.
    fig, ax = plt.subplots()
    u, = plt.plot(t_grid, U[0])
    plt.axis(interval)

    fig.legend((u),
               ('$u$'))
    plt.xlabel('t')


    plt.show()

# Initial conditions.
x_start = 0
x_end = 1

# Initial conditions.
mu1 = 0
mu2 = 0

# Border conditions.
def phi(x):
    return np.sin(2 * np.pi * x)

def FTCS_method():
    # Space grid size.
    M = 30

    # Time grid size.
    N = 400

    # Space step.
    dx = (x_end - x_start) / (M - 1)

    t_start = 0
    t_end = 0.1

    # Time step
    dt = (t_end - t_start) / (N - 1)
    alpha = 1  # коэффициент
    coeff_a = dt * alpha / dx ** 2

    print(dt < (dx ** 2) / 2)

    # Creating grid.
    x_grid = np.linspace(x_start, x_end, M)
    t_grid = np.linspace(t_start, t_end, N)
    U = np.zeros((M, N))

    # Border conditions.
    U[:, 0] = phi(x_grid)

    # Initial conditions.
    U[0, :] = mu1
    U[-1, :] = mu2

    # FTCS (Forward Time Central Space) scheme
    for k in range(0, N - 1):
        for i in range(1, M - 1):
            U[i, k + 1] = coeff_a * (U[i - 1, k] + U[i + 1, k]) + (1 - 2 * coeff_a) * U[i, k]

    draw_chart(t_grid, x_grid, U)



# BTCS (Backward Time Central Space)
def BTCS_method():
    # Space grid size.
    M = 50

    # Time grid size.
    N = 60

    # Space step.
    dx = (x_end - x_start) / (M - 1)

    t_start = 0
    t_end = 0.1

    # Time step
    dt = (t_end - t_start) / (N - 1)
    alpha = 1  # коэффициент
    coeff_a = dt * alpha / dx ** 2

    x_grid = np.linspace(x_start, x_end, M)
    t_grid = np.linspace(t_start, t_end, N)

    main_diag = (1 + 2 * coeff_a) * np.ones((1, M - 2))

    off_diag = -coeff_a * np.ones((1, M - 3))

    a = main_diag.shape[1]
    diagonals = [main_diag, off_diag, off_diag]
    A = sparse.diags(diagonals, [0, -1, 1], shape=(a, a)).toarray()
    U = np.zeros((M, N))

    # Border conditions.
    U[:, 0] = phi(x_grid)

    # Initial conditions.
    U[0, :] = mu1
    U[-1, :] = mu2

    # BTCS scheme
    for k in range(1, N):
        c = np.zeros((M - 4, 1)).ravel()
        b1 = np.asarray([coeff_a * U[0, k], coeff_a * U[1, k]])
        b1 = np.insert(b1, 1, c)
        b2 = np.array(U[1:M - 1, k - 1])
        b = b1 + b2
        U[1:M - 1, k] = np.linalg.solve(A, b)


    # plt.rcParams["figure.figsize"] = (10, 10)
    # plot_step = Nt // 25 if Nt // 25 != 0 else 1
    # for i, ctau in enumerate(tau_arr):
    #     if i % plot_step == 0:
    #         # plt.plot(h_arr, solution(h_arr, ctau), label='exact')
    #         plt.plot(h_arr, u[i], label='numerical')
    #         plt.title("t=" + str(ctau))
    #         plt.legend()
    #         plt.show()

    print("t_grid", t_grid)
    print("x_grid", x_grid)
    print("U", U)

    draw_chart(t_grid, x_grid, U)


def dufort_method():
    # Space grid size.
    M = 30

    # Time grid size.
    N = 1000

    # Space step.
    dx = (x_end - x_start) / (M - 1)

    t_start = 0
    t_end = 0.2

    # Time step
    dt = (t_end - t_start) / (N - 1)
    alpha = 1  # коэффициент
    coeff_a = dt * alpha /(2* dx ** 2)

    print(dt < (dx ** 2) / 2)

    # Creating grid.
    x_grid = np.linspace(x_start, x_end, M)
    t_grid = np.linspace(t_start, t_end, N)
    U = np.zeros((M, N))

    # Border conditions.
    U[:, 0] = phi(x_grid)

    # Initial conditions.
    U[0, :] = mu1
    U[-1, :] = mu2

    # dufort frankel
    for k in range(1, N - 1):
        for i in range(1, M - 1):
            # if k  < 3:
                 # U[i, k + 1] = coeff_a * (U[i - 1, k] + U[i + 1, k]) + (1 - 2 * coeff_a) * U[i, k]
            # else:
            U[i, k + 1] = ((1 - 2 * coeff_a) * U[i, k-1] + 2*coeff_a*(U[i - 1, k] + U[i + 1, k])) / (1+2*coeff_a)

    draw_chart(t_grid, x_grid, U)
    # draw_chart2(t_grid, x_grid, U)


def crank_nickolson_method():
    # Space grid size.
    M = 50

    # Time grid size.
    N = 60

    # Space step.
    dx = (x_end - x_start) / (M - 1)

    t_start = 0
    t_end = 0.1

    # Time step
    dt = (t_end - t_start) / (N - 1)
    alpha = 1  # коэффициент
    coeff_a = dt * alpha / (2 * (dx ** 2))

    a0 = 1 + 2 * coeff_a
    c0 = 1 - 2 * coeff_a

    x_grid = np.linspace(x_start, x_end, M)
    t_grid = np.linspace(t_start, t_end, N)

    main_diag_a0 = a0 * np.ones((1, M))

    off_diag_a0 = -coeff_a * np.ones((1, M - 1))

    main_diag_c0 = c0 * np.ones((1, M))

    off_diag_c0 = coeff_a * np.ones((1, M - 1))
    a = main_diag_a0.shape[1]
    diagonalsA = [main_diag_a0, off_diag_a0, off_diag_a0]
    A = sparse.diags(diagonalsA, [0, -1, 1], shape=(a, a)).toarray()

    A[0, 1] = -2 * coeff_a
    A[M - 1, M - 2] = -2 * coeff_a

    c = main_diag_c0.shape[1]
    diagonalsC = [main_diag_c0, off_diag_c0, off_diag_c0]
    A_rhs = sparse.diags(diagonalsC, [0, -1, 1], shape=(c, c)).toarray()
    A_rhs[0, 1] = 2 * coeff_a
    A_rhs[M - 1, M - 2] = 2 * coeff_a
    U = np.zeros((M, N))
    # ----- Условия -----
    U[:, 0] = np.sin(2 * np.pi * x_grid)
    leftBC = np.arange(1, N + 1)
    rightBC = np.arange(1, N + 1)
    # U[0,:] = 0.0
    # U[-1,:] = 0.0
    for k in range(1, N):
        ins = np.zeros((M - 2, 1)).ravel()
        b1 = np.asarray([0.0, 0.0])
        b1 = np.insert(b1, 1, ins)
        b2 = np.matmul(A_rhs, np.array(U[0:M, k - 1]))
        b = b1 + b2
        U[0:M, k] = np.linalg.solve(A, b)

    # ----- График -----
    draw_chart(t_grid, x_grid, U)



FTCS_method()
BTCS_method()
crank_nickolson_method()
dufort_method()