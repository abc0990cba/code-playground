// Program demonstrates successful
// dynamic casting and it returns a
// value of type new_type
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

int main() {
    A a1;

    Base* base_p = dynamic_cast<Base*>(&a1);

    if (base_p == nullptr) {
        cout << "null" << endl;
    } else {
        base_p->print();
    }

    A* a2 = dynamic_cast<A*>(base_p);

    if (a2 == nullptr) {
        cout << "null" << endl;
    } else {
        a2->print();
    }

    // Output:
    // A
    // A

    return 0;
}
