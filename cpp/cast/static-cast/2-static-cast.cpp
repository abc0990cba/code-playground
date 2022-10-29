#include <iostream>
#include <vector>

int main() {
    // lvalue to xvalue
    std::vector<int> v1{1, 2, 3};
    std::cout << "Vector v1 length: " << v1.size() << std::endl;  // Output: Vector v1 length: 3

    std::vector<int> v2 = static_cast<std::vector<int>&&>(v1);
    std::cout << "Vector v1 length after move: " << v1.size();  // Output: Vector v1 length after move: 0

    // Initializing conversion
    int n = static_cast<int>(3.14);
    std::cout << "n = " << n << '\n';  // n = 3

    // Initializing conversion
    std::vector<int> v = static_cast<std::vector<int>>(10);
    std::cout << "v.size() = " << v.size() << '\n';  // v.size() = 10

    return 0;
}