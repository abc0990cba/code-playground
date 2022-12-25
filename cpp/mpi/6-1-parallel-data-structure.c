// This assignment implements a simple parallel data structure.
// This structure is a two dimension regular mesh of points, divided into slabs,
// with each slab allocated to a different processor. 
// In the simplest C form, the full data structure is
// double x[max_n][max_n];
// and we want to arrange it so that each processor has a local piece:
// double x_local[max_n][max_n / n_procs];
// where n_procs is the n_procs of the communicator(e.g., the number of processors).
// If that was all that there was to it, there wouldn't be anything to do.
// However, for the computation that we're going to perform on this data
// structure, we'll need the adjacent values. That is, to compute a
// new x[i][j], we will need
// x[i][j + 1]
// x[i][j - 1]
// x[i + 1][j]
// x[i - 1][j]
// The last two of these could be a problem if they are not in x_local
// but are instead on the adjacent processors. To handle this difficulty,
// we define ghost points that we will contain the values of these adjacent points.
// This program copy divide the array x into equal - sized strips
// and to copy the adjacent edges to the neighboring processors. 
// Assume that x is max_n by max_n, and that max_n is evenly divided
// by the number of processors. For simplicity, a fixed n_procs array
// and a fixed(or minimum) number of processors.

// To test the routine, have each processor fill its section with the rank
// of the process, and the ghostpoints with - 1.
// After the exchange takes place, test to make sure that
// the ghostpoints have the proper value. 
// Assume that the domain is not periodic; that is,
// the top process(rank = n_procs - 1) only sends and receives data
// from the one under it(rank = n_procs - 2) and the bottom process(rank = 0)
// only sends and receives data from the one above it(rank = 1).
// Consider a max_n of 12 and use 4 processors to start with.

#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include "mpi.h"

//This example handles a 12 x 12 mesh, on 4 processors only.
#define max_n 12
#define expected_n_procs 4

int main(int argc, char** argv) {
    int rank;
    int n_procs;
    int err_cnt;
    int total_err;
    int i;
    int j;
    double x_local[(max_n / expected_n_procs) + 2][max_n];

    MPI_Status status;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &n_procs);

    if (n_procs != expected_n_procs) {
        MPI_Abort(MPI_COMM_WORLD, 1);
    }

    // x_local[][0] is lower ghostpoints, x_local[][max_n+2] is upper

    // Fill the data as specified
    for (i = 1; i <= max_n / n_procs; i++) {
        for (j = 0; j < max_n; j++) {
            x_local[i][j] = rank;
        }
    }

    for (j = 0; j < max_n; j++) {
        x_local[0][j] = -1;
        x_local[max_n / n_procs + 1][j] = -1;
    }

    // Send up unless I'm at the top, then receive from below
    // Note the use of x_local[i] for &x_local[i][0]
    if (rank < n_procs - 1) {
        MPI_Send(x_local[max_n / n_procs], max_n, MPI_DOUBLE, rank + 1, 0, MPI_COMM_WORLD);
    }

    if (rank > 0) {
        MPI_Recv(x_local[0], max_n, MPI_DOUBLE, rank - 1, 0, MPI_COMM_WORLD, &status);
    }

    // Send down unless I'm at the bottom 
    if (rank > 0) {
        MPI_Send(x_local[1], max_n, MPI_DOUBLE, rank - 1, 1, MPI_COMM_WORLD);
    }

    if (rank < n_procs - 1) {
        MPI_Recv(x_local[max_n / n_procs + 1], max_n, MPI_DOUBLE, rank + 1, 1, MPI_COMM_WORLD, &status);
    }

    // Check that we have the correct results
    err_cnt = 0;
    for (i = 1; i <= max_n / n_procs; i++) {
        for (j = 0; j < max_n; j++) {
            if (x_local[i][j] != rank) {
                err_cnt++;
            }
        }
    }

    for (j = 0; j < max_n; j++) {

        if (x_local[0][j] != rank - 1) {
            err_cnt++;
        }

        if (rank < n_procs - 1 && x_local[max_n / n_procs + 1][j] != rank + 1) {
            err_cnt++;
        }
    }

    MPI_Reduce(&err_cnt, &total_err, 1, MPI_INT, MPI_SUM, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        if (total_err) {
            printf("! found %d errors\n", total_err);
        } else {
            printf("No errors\n");
        }
    }

    MPI_Finalize();
    return 0;
}
