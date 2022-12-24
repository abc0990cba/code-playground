// Write a program to test how fair the message passing implementation is.
// To do this, have all processes except process 0 send 100 messages
// to process 0. Have process 0 print out the messages as it receives them,
// using MPI_ANY_SOURCE and MPI_ANY_TAG in MPI_Recv. 
// Is the MPI implementation fair? No, here!

#define _CRT_SECURE_NO_WARNINGS
#include "mpi.h"
#include <stdio.h>

int main(int argc, char** argv) {
    int rank;
    int n_procs;
    int i;
    int buf[1];
    int messages = 100;

    MPI_Status status;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &n_procs);

    if (rank == 0) {
        for (i = 0; i < messages * (n_procs - 1); i++) {
            MPI_Recv(buf, 1, MPI_INT, MPI_ANY_SOURCE, MPI_ANY_TAG, MPI_COMM_WORLD, &status);
            printf("Msg from %d with tag %d\n", status.MPI_SOURCE, status.MPI_TAG);
            fflush(stdout);
        }
    } else {
        for (i = 0; i < 100; i++) {
            MPI_Send(buf, 1, MPI_INT, 0, i, MPI_COMM_WORLD);
        }
    }

    MPI_Finalize();

    return 0;
}
