// https://en.cppreference.com/w/cpp/language/constexpr

#include <iostream>
#include <stdexcept>

// C++11 constexpr functions use recursion rather than iteration.
// (C++14 constexpr functions may use local variables and loops)
constexpr int factorial(int n) {
    return n <= 1 ? 1 : (n * factorial(n - 1));
}

// Output function that requires a compile-time constant, for testing.
template <int n>
struct constN {
    constN() {
        std::cout << n << '\n';
    }
};

int main() {
    std::cout << "4! = ";

    // Computed at compile time.
    constN<factorial(4)> out1;

    // Disallow optimization using volatile.
    volatile int k = 8;

    // Computed at run time.
    std::cout << k << "! = " << factorial(k) << '\n';

    int m = 9;
    
    // Computed at build time.
    std::cout << m << "! = " << factorial(m) << '\n';

    return 0;
}