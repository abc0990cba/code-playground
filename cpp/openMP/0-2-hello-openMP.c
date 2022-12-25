#include <stdio.h>
#include <omp.h>

int main(int argc, char* argv[]) {
    #pragma omp parallel
    {
        int n_threads = omp_get_num_threads();
        int thread_id = omp_get_thread_num();

        #pragma omp master
        {
            printf("Goodbye slow serial world and Hello OpenMP!\n");
            printf("  I have %d thread(s) and my thread id is %d\n", n_threads, thread_id);
        }
    }
}
