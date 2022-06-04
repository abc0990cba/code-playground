import numpy as np

A = np.array([[1,-8], [-1,3]])

a = -1
b = 1

# Count of vectors / 2.
count = 10000

# Vectors with ||A|| = 1
X = np.c_[np.random.choice([-1, 1], count), np.random.rand(count)*(b-a)+a]
Y = np.c_[np.random.rand(count)*(b-a)+a, np.random.choice([-1, 1], count)]
Z = np.concatenate((X, Y))

R = (A.dot(Z.transpose())).transpose()


norm = np.max(np.apply_along_axis(np.linalg.norm, 1, R, np.inf), axis=0)
print("Норма Inf матрицы A, посчитанная с помощью метода Монтк-Карло:\n", norm)

theoretical_norm = np.linalg.norm(A, ord=np.inf)
print("Теоретическое значение нормы Inf матрицы A:\n", theoretical_norm)


# >>> Норма Inf матрицы A, посчитанная с помощью метода Монтк-Карло:
# >>> 8.999531827121968
# >>> Теоретическое значение нормы Inf матрицы A:
# >>> 9.0