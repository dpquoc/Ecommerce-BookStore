CREATE TABLE AUTHOR (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE BOOK (
  isbn INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  on_sale INT DEFAULT 0,
  image_url VARCHAR(255),
  author_id INT NOT NULL,
  cover_designer VARCHAR(255) DEFAULT NULL,
  pages INT NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  lang VARCHAR(255) NOT NULL,
  released DATE NOT NULL,
  description TEXT NOT NULL,
  CHECK (on_sale BETWEEN 0 AND 100),
  FOREIGN KEY (author_id) REFERENCES AUTHOR(id)
);


CREATE TABLE USER (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  fullname VARCHAR(255),
  bday DATE,
  avt_url VARCHAR(255)
);




CREATE TABLE CATEGORY_BOOK (
  category VARCHAR(255) NOT NULL,
  book_isbn INT NOT NULL,
  PRIMARY KEY (book_isbn, category),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn)
);

CREATE TABLE CART (
  user_id INT NOT NULL,
  book_isbn INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (user_id, book_isbn),
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn)
);

CREATE TABLE BLOG (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  banner_url VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE NOT NULL,
  tag VARCHAR(255) NOT NULL
);


CREATE TABLE REVIEW (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rating INT NOT NULL,
  review TEXT,
  user_id INT NOT NULL,
  book_isbn INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn)
);

CREATE TABLE CONTACT (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT false
);



CREATE TABLE USER_LIKE_BOOK (
  user_id INT NOT NULL,
  book_isbn INT NOT NULL,
  PRIMARY KEY (user_id, book_isbn),
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn)
);

DELIMITER // CREATE PROCEDURE search_books(
  IN search_title VARCHAR(255), 
  IN search_category VARCHAR(255), 
  IN search_author INT, 
  IN min_price DECIMAL(10, 2), 
  IN max_price DECIMAL(10, 2), 
  IN sort INT
) BEGIN 
    SELECT 
      b.isbn, 
      b.title, 
      b.price, 
      b.on_sale as onsale, 
      b.image_url as img, 
      b.author_id, 
      GROUP_CONCAT(cb.category SEPARATOR ', ') as categories 
    FROM 
      BOOK b 
      JOIN CATEGORY_BOOK cb ON b.isbn = cb.book_isbn 
    WHERE 
      ( search_title IS NULL OR b.title LIKE CONCAT('%', search_title, '%') ) 
      AND
      ( search_category IS NULL OR cb.category = search_category ) 
      AND 
      ( search_author IS NULL OR b.author_id = search_author ) 
      AND ( min_price IS NULL OR b.price >= min_price ) 
      AND 
      ( max_price IS NULL OR b.price <= max_price ) 
    GROUP BY 
      b.isbn 
    ORDER BY 
      CASE sort WHEN 1 THEN b.price WHEN 2 THEN - b.price ELSE 0 END;
END // 
DELIMITER;


/*
USAGE OF THE FUNCTION
Example : CALL search_books('Harry Potter', 'Fantasy', NULL, 0, 40, 1);
'arry Potte' included in 'Harry Potter' , 1 is the id of author , 0 is min_price or can be higher , 40 is max_price
sort INT parameter = 1 ( sort from low to high ) ,  = 2 ( from high to low ) , else ( no sort )
*/