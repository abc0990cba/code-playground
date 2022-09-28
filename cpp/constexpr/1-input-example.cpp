#include <iostream>

int main() {
    int a;

    std::cout << "Write number, please:" << std::endl;
    std::cin >> a;

    const int b = a;

    // error: the value of ‘a’
    // is not usable in a constant expression
    // constexpr int c = a;

    std::cout << "Your number is: ";
    std::cout << b << std::endl;

    return 0;
}