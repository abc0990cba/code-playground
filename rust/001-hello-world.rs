use std::fs;

fn main() {
    let paths = fs::read_dir("./").unwrap();

    println!("Hello World!");
    
    for path in paths {
        println!("Path: {}", path.unwrap().path().display())
    }
}

// Output:
// Hello World!
// Path: ./.bash_logout
// Path: ./.bashrc
// Path: ./.profile
// Path: ./target
// Path: ./.cargo
// Path: ./src
// Path: ./Cargo.toml
// Path: ./Cargo.lock
// Path: ./crate-information.json
// Path: ./.gitignore
// Path: ./.git
// Path: ./tools
// Path: ./.rustup
// Path: ./security_notice.txt
