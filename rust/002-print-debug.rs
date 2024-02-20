#[derive(Debug)]
struct Structure(i32);

#[derive(Debug)]
struct Deep(Structure);

#[derive(Debug)]
struct Person<'a> {
    name: &'a str,
    age: u8
}

fn main() {
    println!("{:?} seconds in a minute.", 60);
    // 60 seconds in a minute.
    
    println!("!{1:?} {0:?} is the {actor:?} name.",
             "Dow",
             "John",
             actor="actor's");
    // !"John" "Dow" is the "actor's" name.
             
    println!("!{1} {0} is the {actor} name.",
             "Dow",
             "John",
             actor="actor's");
    // !John Dow is the actor's name.
    
    println!("{:?} is printed.", Structure(10));
    // Structure(10) is printed.
    
     println!("{:?} is printed.", Deep(Structure(10)));
    // Deep(Structure(10)) is printed.
    
    let name = "Kim";
    let age = 29;
    let kim = Person { name, age };

    println!("{:?}", kim);
    // Person { name: "Kim", age: 29 }
    
    println!("{:#?}", kim);
    // Person {
    //     name: "Kim",
    //     age: 29,
    // }
}
