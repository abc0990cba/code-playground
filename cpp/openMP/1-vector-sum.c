#include <stdio.h>
#include <omp.h>

#define ARRAY_SIZE 8000000

static double a[ARRAY_SIZE];
static double b[ARRAY_SIZE];
static double c[ARRAY_SIZE];

void vector_add(double* c, double* a, double* b, int n);

int main(int argc, char* argv[]) {

    //omp_set_num_threads(2);

    #pragma omp parallel
    if (omp_get_thread_num() == 0) {
        printf("Running with %d thread(s)\n", omp_get_num_threads());
    }

    double start_time;
    double end_time;

    #pragma omp parallel
    {
        #pragma omp for
        for (int i = 0; i < ARRAY_SIZE; i++) {
            a[i] = 1.0;
            b[i] = 2.0;
        }

        #pragma omp master
        start_time = omp_get_wtime();

        vector_add(c, a, b, ARRAY_SIZE);

        #pragma omp master
        end_time = omp_get_wtime();
    } 

    printf("\nTime taken: %f\n", (end_time - start_time));
}

void vector_add(double* c, double* a, double* b, int n) {
    #pragma omp for
    for (int i = 0; i < n; i++) {
        c[i] = a[i] + b[i];
    }
}
