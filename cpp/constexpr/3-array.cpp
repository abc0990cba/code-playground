// https://en.cppreference.com/w/cpp/language/constexpr

#include <iostream>

int main() {
    constexpr int a[12] = {0, 1, 2, 3, 4, 5, 6, 7, 8};
    constexpr int length_a = sizeof(a) / sizeof(int);

    std::cout << "Array of length " << length_a << " has elements: ";
    for (int i = 0; i < length_a; ++i)
        std::cout << a[i] << " ";
}