// https://en.cppreference.com/w/cpp/language/constant_expression

#include <bitset>
#include <limits>

int main() {
    // OK
    constexpr double d1 = 2.0 / 1.0;

    // Error: not defined
    constexpr double d2 = 2.0 / 0.0;

    // Error: overflow
    constexpr int n = std::numeric_limits<int>::max() + 1;

    int x, y, z[30];

    // Error: undefined
    constexpr auto e1 = &y - &x;

    // OK
    constexpr auto e2 = &z[20] - &z[3];

    constexpr std::bitset<2> a;

    // UB, but unspecified if detected
    constexpr bool b = a[2];

    return 0;
}