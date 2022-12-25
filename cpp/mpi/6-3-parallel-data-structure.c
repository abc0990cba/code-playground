// Replacing the MPI_Sendand MPI_Recv calls in previous solution
// with two calls to MPI_Sendrecv. The first call shift data up;
// that is, it send data to the processor above and receive data from
// the processor below.The second call to MPI_Sendrecv reverse this;
// it send data to the processor below and receive from the processor above.
// https://www.mcs.anl.gov/research/projects/mpi/tutorial/mpiexmpl/src/exchange/C/shift/main.html

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
    int up_nbr;
    int down_nbr;

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

    // Send up and receive from below (shift up) 
    // Note the use of xlocal[i] for &xlocal[i][0]
    // Note that we use MPI_PROC_NULL to remove the if statements that
    // would be needed without MPI_PROC_NULL
    up_nbr = rank + 1;
    if (up_nbr >= n_procs) {
        up_nbr = MPI_PROC_NULL;
    }

    down_nbr = rank - 1;
    if (down_nbr < 0) {
        down_nbr = MPI_PROC_NULL;
    }

    MPI_Sendrecv(x_local[max_n / n_procs], max_n, MPI_DOUBLE, up_nbr, 0,
                 x_local[0], max_n, MPI_DOUBLE, down_nbr, 0,
                 MPI_COMM_WORLD, &status);

    // Send down and receive from above (shift down)
    MPI_Sendrecv(x_local[1], max_n, MPI_DOUBLE, down_nbr, 1,
                 x_local[max_n / n_procs + 1], max_n, MPI_DOUBLE, up_nbr, 1,
                 MPI_COMM_WORLD, &status);

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
