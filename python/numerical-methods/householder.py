# Householder transformation.

import numpy as np

vector_size = 3
u = np.array([[1, 0, -2]])
uT = u.transpose()

# <v,u> = 0
v = np.array([2,5,1])



# Identity matrix.
E = np.eye(vector_size)

numerator = u * uT
denominator = u.dot(uT)

H = E - 2 * numerator / denominator


# 1 property(symmetry).
print("1 property(symmetry):")
print("matrix H:")
print(H)
print("\ntransposed matrix H:")
print(H.transpose())
print("----------------------------\n\n")


# 2 property(orthogonality)
print("2 property(orthogonality):")
print("matrix H*H(transposed):")
print(H.dot(H.transpose()))
print("\nmatrix H(transposed)*H:")
print(H.transpose().dot(H))
print("----------------------------\n\n")


# 3 property(identity)
print("3 property(identity):")
print("matrix H*H:")
print(H.dot(H))
print("----------------------------\n\n")


# 4 property(Hv = 0, if <v,u> = 0)

print("4 property(Hv = 0, if <v,u> = 0):")
print("vector v = ", v)
print("vector u = ", u[0])
print("<v,u> = ", v.dot(u[0]))
print("\nHv = ", H.dot(v))
print("----------------------------\n\n")

