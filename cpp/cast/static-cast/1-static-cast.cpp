#include <iostream>

struct B {
    const char* print() const {
        return "This is B!\n";
    }
};

struct D : B {
    const char* print() const {
        return "This is D!\n";
    }
};

int main() {
    D d;
    // Upcast via implicit conversion
    B& b = d;
    std::cout << b.print();

    // Static downcast
    D& another_d = static_cast<D&>(b);
    std::cout << another_d.print();

    // Output:
    // This is B!
    // This is D!

    return 0;
}
