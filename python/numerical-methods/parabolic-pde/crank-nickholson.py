from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from matplotlib import cm
M = 50 # пространственная сетка
N = 60 # временная сетка
x0 = 0
xL = 1
# ----- Пространственный шаг -----
dx = (xL - x0)/(M - 1)
t0 = 0
tF = 0.2
# ----- Временной шаг -----
dt = (tF - t0)/(N - 1)
alf = 0.1  # коэффициент
r = dt*alf/(2*dx**2)
a0 = 1 + 2*r 
c0 = 1 - 2*r 
xspan = np.linspace(x0, xL, M)
tspan = np.linspace(t0, tF, N)
main_diag_a0 = a0*np.ones((1,M))
off_diag_a0 = -r*np.ones((1, M-1))
main_diag_c0 = c0*np.ones((1,M))
off_diag_c0 = r*np.ones((1, M-1))
a = main_diag_a0.shape[1]
diagonalsA = [main_diag_a0, off_diag_a0, off_diag_a0]
A = sparse.diags(diagonalsA, [0,-1,1], shape=(a,a)).toarray()
A[0,1] = -2*r
A[M-1,M-2] = -2*r
c = main_diag_c0.shape[1]
diagonalsC = [main_diag_c0, off_diag_c0, off_diag_c0]
A_rhs = sparse.diags(diagonalsC, [0,-1,1], shape=(c,c)).toarray()
A_rhs[0,1] = 2*r
A_rhs[M-1,M-2] = 2*r
U = np.zeros((M, N))
#----- Условия -----
U[:,0] = np.sin(2*np.pi*xspan)
leftBC = np.arange(1, N+1)
rightBC = np.arange(1, N+1)
#U[0,:] = 0.0
#U[-1,:] = 0.0
for k in range(1, N):
    ins = np.zeros((M-2,1)).ravel()
    b1 = np.asarray([0.0, 0.0])
    b1 = np.insert(b1, 1, ins)
    b2 = np.matmul(A_rhs, np.array(U[0:M, k-1]))
    b = b1 + b2 
    U[0:M, k] = np.linalg.solve(A,b)
# ----- График -----
T, X = np.meshgrid(tspan, xspan)
fig = plt.figure()
ax = fig.gca(projection='3d')
surf = ax.plot_surface(X, T, U, cmap=cm.coolwarm,
                       linewidth=0, antialiased=False)
ax.set_xticks([0, 0.25, 0.5, 0.75, 1.0])
ax.set_yticks([0, 0.05, 0.1, 0.15, 0.2])
ax.set_xlabel('Space')
ax.set_ylabel('Time')
ax.set_zlabel('U')
ax.view_init(elev=33, azim=36)
plt.tight_layout()
plt.show()
