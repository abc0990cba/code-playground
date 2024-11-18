CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    published_year INT,
    genre VARCHAR(50)
);

CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    membership_date DATE
);

CREATE TABLE borrowed_books (
    borrow_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES books(book_id),
    member_id INT REFERENCES members(member_id),
    borrow_date DATE,
    return_date DATE
);

INSERT INTO books (title, author, published_year, genre)
     VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Fiction'),
            ('1984', 'George Orwell', 1949, 'Dystopian'),
            ('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction');

INSERT INTO members (name, membership_date)
     VALUES ('Alice Johnson', '2023-01-15'),
            ('Bob Smith', '2023-02-20');

INSERT INTO borrowed_books (book_id, member_id, borrow_date, return_date)
     VALUES (1, 1, '2023-03-01', NULL),
            (2, 2, '2023-03-05', NULL),
            (3, 1, '2023-03-10', '2023-03-20');

CREATE VIEW currently_borrowed_books AS
     SELECT b.title,
            b.author,
            m.name AS member_name,
            bb.borrow_date
       FROM borrowed_books bb
       JOIN books b
         ON bb.book_id = b.book_id
       JOIN members m
         ON bb.member_id = m.member_id
      WHERE bb.return_date IS NULL;

SELECT * FROM currently_borrowed_books;
