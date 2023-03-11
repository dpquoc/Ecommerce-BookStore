CREATE TABLE BOOK (
  isbn INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
  price DECIMAL(10,2) NOT NULL,
  on_sale INT DEFAULT 0,
  image_url VARCHAR(255),
  cover_designer VARCHAR(255) DEFAULT NULL,
  pages INT NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  lang VARCHAR(255) NOT NULL,
  released DATE NOT NULL,
  description TEXT NOT NULL,
  CHECK (on_sale BETWEEN 0 AND 100)
);


CREATE TABLE AUTHOR (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE AUTHOR_WRITE_BOOK (
  book_isbn INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (book_isbn, author_id),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn),
  FOREIGN KEY (author_id) REFERENCES AUTHOR(id)
);


CREATE TABLE CATEGORY_BOOK (
  category VARCHAR(255) NOT NULL,
  book_isbn INT NOT NULL,
  PRIMARY KEY (book_isbn, category),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn),
);

CREATE TABLE CART (
  user_id INT NOT NULL,
  book_isbn INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (user_id, book_isbn),
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (book_id) REFERENCES BOOK(isbn)
);

CREATE TABLE BLOG (
  title VARCHAR(255) PRIMARY KEY,
  banner_url VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE NOT NULL
);

CREATE TABLE USER_LIKE_BOOK (
  user_id INT NOT NULL,
  book_isbn INT NOT NULL,
  PRIMARY KEY (user_id, book_isbn),
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn)
);


DELIMITER //
CREATE FUNCTION search_books(search_title VARCHAR(255), search_category VARCHAR(255), search_author INT, min_price DECIMAL(10,2), max_price DECIMAL(10,2))
RETURNS TABLE
BEGIN
    RETURN (
        SELECT b.*
        FROM BOOK b
        JOIN AUTHOR_WRITE_BOOK awb ON b.isbn = awb.book_isbn
        JOIN CATEGORY_BOOK cb ON b.isbn = cb.book_isbn
        WHERE (search_title IS NULL OR b.title LIKE CONCAT('%', search_title, '%'))
            AND (search_category IS NULL OR cb.category = search_category)
            AND (search_author IS NULL OR awb.author_id = search_author)
            AND (min_price IS NULL OR b.price >= min_price)
            AND (max_price IS NULL OR b.price <= max_price)
    );
END //
DELIMITER ;

/*
USAGE OF THE FUNCTION
Example : SELECT * FROM search_books('arry Potte', 'Fantasy', 1, 0, 40); 
'arry Potte' included in 'Harry Potter' , 1 is the id of author , 0 is min_price or can be higher , 40 is max_price
*/