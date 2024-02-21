static PI: f64 = 3.14;

fn main() {
    static mut CAT: &'static str = "cat";
    
    let dog: &'static str = "dog";
    let num: &'static f64 = &PI;
    println!("{} {}", dog, num);
    
    unsafe {
        CAT = "random";
        println!("{}", CAT);
    }
}
