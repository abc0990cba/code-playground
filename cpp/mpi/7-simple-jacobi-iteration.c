// https://www.mcs.anl.gov/research/projects/mpi/tutorial/mpiexmpl/src/jacobi/C/main.html

#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <math.h>
#include "mpi.h"

// This example handles a 12 x 12 mesh, on 4 processors only.
#define max_n 12
#define expected_n_procs 4

int main(int argc, char** argv) {
	int rank;
	int n_procs;
	int i;
	int j;
	int i_first;
	int i_last;
	int it_cnt;
	int max_cnt = 100;

	MPI_Status status;

	// Calculation error.
	double EPS = 1.0e-2;
	double diff_norm;
	double g_diff_norm;
	double x_local[(max_n / expected_n_procs) + 2][max_n];
	double x_new[(max_n / 3) + 2][max_n];

	MPI_Init(&argc, &argv);

	MPI_Comm_rank(MPI_COMM_WORLD, &rank);
	MPI_Comm_size(MPI_COMM_WORLD, &n_procs);

	if (n_procs != expected_n_procs) {
		MPI_Abort(MPI_COMM_WORLD, 1);
	}

	// x_local[][0] is lower ghostpoints, x_local[][max_n+2] is upper

	// Note that top and bottom processes have one less row of interior points
	i_first = 1;
	i_last = max_n / n_procs;

	if (rank == 0) {
		i_first++;
	}

	if (rank == n_procs - 1) {
		i_last--;
	}

	// Fill the data as specified
	for (i = 1; i <= max_n / n_procs; i++) {
		for (j = 0; j < max_n; j++) {
			x_local[i][j] = rank;
		}
	}

	for (j = 0; j < max_n; j++) {
		x_local[i_first - 1][j] = -1;
		x_local[i_last + 1][j] = -1;
	}

	it_cnt = 0;
	do {
		// Send up unless I'm at the top, then receive from below
		// Note the use of x_local[i] for &x_local[i][0] 
		if (rank < n_procs - 1) {
			MPI_Send(x_local[max_n / n_procs], max_n, MPI_DOUBLE,
				rank + 1, 0, MPI_COMM_WORLD);
		}

		if (rank > 0) {
			MPI_Recv(x_local[0], max_n, MPI_DOUBLE,
				rank - 1, 0, MPI_COMM_WORLD, &status);
		}

		// Send down unless I'm at the bottom
		if (rank > 0) {
			MPI_Send(x_local[1], max_n, MPI_DOUBLE,
				rank - 1, 1, MPI_COMM_WORLD);
		}

		if (rank < n_procs - 1) {
			MPI_Recv(x_local[max_n / n_procs + 1], max_n, MPI_DOUBLE,
				rank + 1, 1, MPI_COMM_WORLD, &status);
		}

		// Compute new values (but not on boundary)
		it_cnt++;
		diff_norm = 0.0;

		for (i = i_first; i <= i_last; i++) {
			for (j = 1; j < max_n - 1; j++) {
				x_new[i][j] = (x_local[i][j + 1] + x_local[i][j - 1] +
					x_local[i + 1][j] + x_local[i - 1][j]) / 4.0;
				diff_norm += (x_new[i][j] - x_local[i][j]) *
					(x_new[i][j] - x_local[i][j]);
			}
		}

		// Only transfer the interior points
		for (i = i_first; i <= i_last; i++) {
			for (j = 1; j < max_n - 1; j++) {
				x_local[i][j] = x_new[i][j];
			}
		}

		MPI_Allreduce(&diff_norm, &g_diff_norm, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

		g_diff_norm = sqrt(g_diff_norm);

		if (rank == 0) {
			printf("At iteration %d, diff is %e\n", it_cnt, g_diff_norm);
		}
	} while (g_diff_norm > EPS && it_cnt < max_cnt);

	MPI_Finalize();

	return 0;
}
