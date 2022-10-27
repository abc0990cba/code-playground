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

class C : public B {
   public:
    virtual void print() {
        std::cout << "C" << std::endl;
    }
};

int main() {
    A a;
    a.print();

    B b;
    b.print();

    C c;

    // This type of conversion is called an "upcast"
    // because it moves a pointer up a class hierarchy,
    // from a derived class to a class it is derived from.
    // An upcast is an implicit conversion.

    // ok: B is a direct base class
    // pb points to B subobject of pc
    B* pb = dynamic_cast<B*>(&c);
    if (pb != nullptr) {
        pb->print();
    }

    // ok: A is an indirect base class
    // pa points to A subobject of pc
    A* pa = dynamic_cast<A*>(&c);
    if (pa != nullptr) {
        pa->print();
    }

    // Output:
    // A
    // B
    // C
    // C

    return 0;
}