// This program provide fair reception of message from all sending processes.
// Arrange the program to have all processes except process 0 send 100 messages
// to process 0. Have process 0 print out the messages as it receives them.
// Using nonblocking receives and MPI_Waitsome.
// Is the MPI implementation fair? Yes!
// https://www.mcs.anl.gov/research/projects/mpi/tutorial/mpiexmpl/src/fairness/C/waitsome/main.html

#define _CRT_SECURE_NO_WARNINGS
#define large 128
#include <stdio.h>
#include "mpi.h"

int main(int argc, char** argv) {
	int rank;
	int n_procs;
	int i;
	int s_buf = 1;
	int cnt;
	int messages = 100;

	MPI_Init(&argc, &argv);
	MPI_Comm_rank(MPI_COMM_WORLD, &rank);
	MPI_Comm_size(MPI_COMM_WORLD, &n_procs);

	if (rank == 0) {
		MPI_Request requests[large];
		MPI_Status  statuses[large];
		int indices[large];
		int buf[large];
		int j;
		int n_done;

		for (i = 1; i < n_procs; i++) {
			MPI_Irecv(buf + i, 1, MPI_INT, i, MPI_ANY_TAG, MPI_COMM_WORLD, &requests[i - 1]);
		}

		cnt = (n_procs - 1) * messages;

		while (cnt > 0) {
			MPI_Waitsome(n_procs - 1, requests, &n_done, indices, statuses);
			for (i = 0; i < n_done; i++) {
				j = indices[i];

				printf("Msg from %d with tag %d\n", statuses[i].MPI_SOURCE, statuses[i].MPI_TAG);
				fflush(stdout);

				MPI_Irecv(buf + j, 1, MPI_INT, j + 1, MPI_ANY_TAG, MPI_COMM_WORLD, &requests[j]);
			}

			cnt -= n_done;
		}
		
		// We should really cancel the pending receives.
		for (i = 0; i < n_procs - 1; i++) {
			MPI_Cancel(&requests[i]);
		}
	} else {
		for (i = 0; i < messages; i++) {
			MPI_Send(&s_buf, 1, MPI_INT, 0, i, MPI_COMM_WORLD);
		}
	}

	MPI_Finalize();

	return 0;
}
