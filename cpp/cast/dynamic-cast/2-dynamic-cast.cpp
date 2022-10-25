// Program demonstrate if the cast
// fails and new_type is a pointer type
// it returns a null pointer of that type
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

    if (base_p == nullptr) {
        cout << "null" << endl;
    } else {
        base_p->print();
    }

    B* b = dynamic_cast<B*>(base_p);

    if (b == nullptr) {
        cout << "null" << endl;
    } else {
        b->print();
    }

    // Output:
    // A
    // null

    return 0;
}
