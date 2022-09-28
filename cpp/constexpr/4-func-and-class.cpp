// https://en.cppreference.com/w/cpp/language/constexpr

#include <iostream>
#include <stdexcept>

// Literal class.
class ConstStr {
    const char* p;
    std::size_t sz;

   public:
    template <std::size_t length>
    constexpr ConstStr(const char (&a)[length]) : p(a), sz(length - 1) {}

    // constexpr functions signal errors by throwing exceptions
    // in C++11, they must do so from the conditional operator ?:
    constexpr char operator[](std::size_t i) const {
        return i < sz ? p[i] : throw std::out_of_range("");
    }

    constexpr std::size_t size() const { return sz; }
};

// C++11 constexpr functions had to put everything in a single return statement
// (C++14 doesn't have that requirement)
constexpr std::size_t CountLower(ConstStr s, std::size_t n = 0,
                                 std::size_t c = 0) {
    if (n == s.size()) {
        return c;
    } else if ('a' <= s[n] && s[n] <= 'z') {
        return CountLower(s, n + 1, c + 1);
    } else {
        return CountLower(s, n + 1, c);
    }
}

// Output function that requires a compile-time constant, for testing.
template <int n>
struct constN {
    constN() {
        std::cout << n << '\n';
    }
};

int main() {
    std::cout << "The number of lowercase letters in \"Hello, world!\" is: ";

    // Implicitly converted to ConstStr.
    constN<CountLower("Hello, world!")> out2;

    return 0;
}