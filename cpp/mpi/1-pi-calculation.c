#include <stdio.h>
#include <math.h>
#include "mpi.h"

double f(double a) {
    return (4.0 / (1.0 + a * a));
}

int main(int argc, char* argv[]) {
    int n_cuts = 1e4;
    int rank;
    int n_procs;
    double PI = 3.141592653589793238462643;
    double calculated_pi;
    
    MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &n_procs);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    double start_time; 
    double end_time;

    if (rank == 0) {
        start_time = MPI_Wtime();
    }

    MPI_Bcast(&n_cuts, 1, MPI_INT, 0, MPI_COMM_WORLD);

    double step = 1.0 / (double)n_cuts;
    double sum = 0.0;

    double x;
    for (int i = rank + 1; i <= n_cuts; i += n_procs) {
        x = step * ((double)i - 0.5);
        sum += f(x);
    }

    double local_pi = step * sum;
    MPI_Reduce(&local_pi, &calculated_pi, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);

    if (rank == 0) {
        printf("pi is %.16f, Error is %.16f\n", calculated_pi, fabs(calculated_pi - PI));
        end_time = MPI_Wtime();
        printf("wall clock time = %f\n", end_time - start_time);
    }

    MPI_Finalize();

    return 0;
}
