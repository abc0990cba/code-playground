#include <stdio.h>
#include <omp.h> 

int main() {

	int sum = 0;

	#pragma omp parallel for reduction(+:sum) 
	for (int i = 0; i < 20; i++) {
		sum += i;
		printf("Current Sum: %d, Current i: %d, Current Thread: %d\n",
			    sum, i, omp_get_thread_num());
	}

	printf("\nSum is : %d\n", sum);

	return 0;
}
