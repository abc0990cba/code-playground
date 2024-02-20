use std::fmt;

#[derive(Debug)]
struct MinMax(i64, i64);

impl fmt::Display for MinMax {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.0, self.1)
    }
}

#[derive(Debug)]
struct Complex {
    real: f64,
    imag: f64,
}

impl fmt::Display for Complex {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{} + {}i", self.real, self.imag)
    }
}

fn main() {
    let minmax = MinMax(0, 14);

    println!("Display: {}", minmax);
    // Display: (0, 14)

    println!("Debug: {:?}", minmax);
    // Debug: MinMax(0, 14)

    let big_range =   MinMax(-100, 200);
    let small_range = MinMax(-1, 3);

    println!("The big range is {big} and the small is {small}",
             small = small_range,
             big = big_range);
    // The big range is (-100, 200) and the small is (-1, 3)

    let complex_num = Complex { real: 3.3, imag: 7.2 };
    
    println!("Display: {}", complex_num);
    // Display: 3.3 + 7.2i

    println!("Debug: {:?}", complex_num);
    // Debug: Complex { real: 3.3, imag: 7.2 }
}
