#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include "mpi.h"

int main(int argc, char** argv) {
    int rank;
    int value;

    MPI_Init(&argc, &argv);

    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    do {
        if (rank == 0) {
            // Enter 0 to stop.
            scanf("%d", &value);
        }

        MPI_Bcast(&value, 1, MPI_INT, 0, MPI_COMM_WORLD);

        printf("Process %d got %d\n", rank, value);
        fflush(stdout);
    } while (value > 0);

    MPI_Finalize();
    return 0;
}
