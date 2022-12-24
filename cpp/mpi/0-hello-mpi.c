#include <stdio.h>
#include "mpi.h"

int main(int  argc, char** argv) {
    int rank;
    int n_procs;

    MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &n_procs);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    printf("Hello world from process %d of %d\n", rank, n_procs);

    MPI_Finalize();
    return 0;
}
