#include <iostream>

class A {
   public:
    virtual void print() {
        std::cout << "A" << std::endl;
    }
};

class B : public A {
   public:
    virtual void print() {
        std::cout << "B" << std::endl;
    }
};

int main() {
    // Unclear, but ok.
    A* pa1 = new B;
    pa1->print();

    A* pa2 = new A;
    pa2->print();

    B* pb1 = dynamic_cast<B*>(pa1);
    if (pb1 != nullptr) {
        pb1->print();
    } else {
        std::cout << "pb1 = nullptr";
    }

    B* pb2 = dynamic_cast<B*>(pa2);
    if (pb2 != nullptr) {
        pb2->print();
    } else {
        std::cout << "pb2 = nullptr";
    }

    // Output:
    // B
    // A
    // B
    // pb2 = nullptr

    return 0;
}