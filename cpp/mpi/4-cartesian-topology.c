// In the ring example we assume that the "next" process is the one
// with rank one greater than our rank. That is, process i sends to
// process i + 1. This may not be the best choice of "next" process,
// particularly when using a communicator other than MPI_COMM_WORLD. 
// MPI provides topology routines to find a good ordering of processes,
// particularly for simple linear orderings such as needed here.
// The assignment is to replace the use of "rank+1" and "rank-1"
// (where rank refers to the rank in MPI_COMM_WORLD of the calling process)
// with values computed using MPI_Cart_shift.

#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include "mpi.h"

int main(int argc, char** argv) {
    int rank;
    int n_procs;
    int periods = 0;
    int value;
    int right_nbr;
    int left_nbr;

    MPI_Comm   ring_comm;
    MPI_Status status;

    MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &n_procs);

    MPI_Cart_create(MPI_COMM_WORLD, 1, &n_procs, &periods, 1, &ring_comm);
    MPI_Cart_shift(ring_comm, 0, 1, &left_nbr, &right_nbr);

    MPI_Comm_rank(ring_comm, &rank);
    MPI_Comm_size(ring_comm, &n_procs);

    do {
        if (rank == 0) {
            // Enter value (0 to stop).
            scanf("%d", &value);
            MPI_Send(&value, 1, MPI_INT, right_nbr, 0, ring_comm);
        } else {
            MPI_Recv(&value, 1, MPI_INT, left_nbr, 0, ring_comm, &status);
            MPI_Send(&value, 1, MPI_INT, right_nbr, 0, ring_comm);
        }

        printf("Process %d got %d\n", rank, value);
        fflush(stdout);
    } while (value > 0);

    MPI_Finalize();

    return 0;
}
