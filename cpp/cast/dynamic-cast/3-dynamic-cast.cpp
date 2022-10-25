// Program demonstrate if the cast
// fails and new_type is a reference
// type it throws an exception
#include <exception>
#include <iostream>

using namespace std;

class Base {
   public:
    virtual void print() {
        cout << "Base" << endl;
    }
};

class A : public Base {
   public:
    virtual void print() {
        cout << "A" << endl;
    }
};

class B : public Base {
   public:
    virtual void print() {
        cout << "B" << endl;
    }
};

int main() {
    A a;
    Base* base_p = dynamic_cast<Base*>(&a);
    A* a1 = dynamic_cast<A*>(base_p);

    if (a1 == nullptr) {
        cout << "null" << endl;
    } else {
        a1->print();
    }

    try {
        B& b = dynamic_cast<B&>(a);
        b.print();
    } catch (std::exception& err) {
        cout << err.what() << endl;
    }

    B* b = dynamic_cast<B*>(a1);
    if (b == nullptr) {
        cout << "null" << endl;
    } else {
        b->print();
    }

    // Output:
    // A
    // std::bad_cast
    // null

    return 0;
}
