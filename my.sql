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
  fullname VARCHAR(255) NOT NULL,
  bday DATE ,
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

CREATE TABLE ORDERS (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL DEFAULT -1,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  telephone VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status ENUM('Pending', 'In Transit', 'Delayed', 'Delivered', 'Cancelled', 'Returned') NOT NULL DEFAULT 'Pending'
);


CREATE TABLE ORDER_ITEM (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  book_isbn INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES ORDERS(id),
  FOREIGN KEY (book_isbn) REFERENCES BOOK(isbn)
);


DELIMITER // 
CREATE PROCEDURE search_books(
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
DELIMITER ;


/*
USAGE OF THE FUNCTION
Example : CALL search_books('Harry Potter', 'Fantasy', NULL, 0, 40, 1);
'arry Potte' included in 'Harry Potter' , 1 is the id of author , 0 is min_price or can be higher , 40 is max_price
sort INT parameter = 1 ( sort from low to high ) ,  = 2 ( from high to low ) , else ( no sort )
*/

/*-------------------------ENRICH DATABASE-------------------------*/

/*FIRST ADMIN*/
INSERT INTO USER (email, username, password, role, fullname)
VALUES ('', 'admin', '$2y$10$DVqz9I7oFKR/c0h5juTL3uxQWujtmtE3dY7cunDvH9KfiDrGfgu0K', 'admin', 'Original Admin');

/*AUTHOR*/
INSERT INTO AUTHOR (name, img_url, description)
VALUES ('Sarfaraz', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/author-01.jpg', 'How to Build a Successful Blog Business is a straight forward guide to building a publishing business online that covers everything from choosing a niche to hiring staff, registering a business to selling it.
Finding traffic to monetizing it whether you are interested in creating an additional income stream or building a fully-fledged business, this is an essential read for web entrepreneurs and online publishers.');

INSERT INTO AUTHOR (name, img_url, description) 
VALUES ('Saifudin A.', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/author-02.jpg', 'How to Build a Successful Blog Business is a straight forward guide to building a publishing business online that covers everything from choosing a niche to hiring staff, registering a business to selling it.
Finding traffic to monetizing it whether you are interested in creating an additional income stream or building a fully-fledged business, this is an essential read for web entrepreneurs and online publishers.');

INSERT INTO AUTHOR (name, img_url, description)
VALUES ('Brian O Well', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/author-03.jpg', 'How to Build a Successful Blog Business is a straight forward guide to building a publishing business online that covers everything from choosing a niche to hiring staff, registering a business to selling it.
Finding traffic to monetizing it whether you are interested in creating an additional income stream or building a fully-fledged business, this is an essential read for web entrepreneurs and online publishers.');

INSERT INTO AUTHOR (name, img_url, description)
VALUES ('Atkia', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/author-04.jpg', 'How to Build a Successful Blog Business is a straight forward guide to building a publishing business online that covers everything from choosing a niche to hiring staff, registering a business to selling it.');


/*BOOK*/
INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Lyrics of the Lalala Musical', 24.99, 10, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-01.jpg', 1, 'Amanda Smith', 256, 'Penguin Books', 'English', '2022-01-01', 'This is the official songbook for the hit musical "Lalala". It includes all of the lyrics from the show, as well as exclusive behind-the-scenes photos and commentary from the writers and performers. Perfect for fans of the show or anyone who loves musical theater!');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('See Me', 14.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-02.jpg', 2, 'Sarah Johnson', 320, 'Grand Central Publishing', 'English', '2015-10-13', 'A romantic suspense novel by bestselling author Nicholas Sparks, featuring characters with complicated pasts and a dangerous present. Will they be able to overcome their differences and find love?');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('The Dead Compendium Volume 3', 29.99, 20, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-03.jpg', 3, 'Mark Johnson', 1120, 'Image Comics', 'English', '2015-09-29', 'The third volume of the popular graphic novel series "The Walking Dead", collecting issues #97-144. Follow the survivors as they struggle to survive in a world overrun by zombies. This volume includes the introduction of fan-favorite character Negan.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Big Magic Beyond Fear', 12.99, 5, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-04.jpg', 4, 'Emily Wilson', 288, 'Riverhead Books', 'English', '2016-09-27', 'A self-help book by Elizabeth Gilbert, author of "Eat, Pray, Love". In this book, Gilbert shares her insights on creativity, inspiration, and fear, and encourages readers to embrace their creativity and pursue their passions.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Kill Shot Assassin Thriller', 9.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-05.jpg', 1, 'David Smith', 416, 'Pocket Books', 'English', '2012-02-07', 'A thriller novel by Vince Flynn, featuring CIA operative Mitch Rapp. In this installment, Rapp is tasked with tracking down a group of terrorists who are planning a major attack on the United States. Will he be able to stop them in time?');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('The American Lady', 8.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-06.jpg', 2, 'Samantha Green', 464, 'Berkley Books', 'English', '2012-02-07', 'A historical romance novel by Petra Durst-Benning, set in the early 20th century. The story follows a young woman named Sophie who leaves Germany for America in search of a better life. Along the way, she meets a handsome man named Luke and the two fall in love. But will their love be enough to overcome the challenges they face?');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Everything’s Eventual: Tales', 12.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-07.jpg', 3, 'Sarah Williams', 464, 'Scribner', 'English', '2002-03-19', 'A collection of 14 short stories by Stephen King, ranging from horror to science fiction to suspense. These stories showcase King''s mastery of storytelling and his ability to create unforgettable characters.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Act of Treason (A Rapp Novel)', 8.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-08.jpg', 4, 'Mark Johnson', 480, 'Pocket Star', 'English', '2006-09-12', 'A political thriller novel by Vince Flynn, featuring the CIA operative Mitch Rapp. In this book, Rapp must uncover a conspiracy that involves some of the highest levels of the US government. Will he be able to stop the conspirators before it''s too late?');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('American Assassin Thriller', 14.99, 5, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-09.jpg', 1, 'Tom Lee', 464, 'Atria/Emily Bestler Books', 'English', '2010-07-06', 'A thriller novel by Vince Flynn, which serves as a prequel to his Mitch Rapp series. In this book, a young Mitch Rapp is recruited by the CIA to become a top secret agent. But as he goes through his training, he realizes that not everything is as it seems.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Humans of New York: Stories', 22.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-10.jpg', 2, 'Brandon Stanton', 432, 'St. Martin''s Press', 'English', '2015-10-13', 'A collection of photographs and stories from the popular Humans of New York blog. In this book, photographer Brandon Stanton captures the diversity and humanity of New York City through the stories of the people who live there.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Everything’s Eventual: Dark', 9.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-11.jpg', 3, 'Sarah Williams', 480, 'Pocket Books', 'English', '2002-11-01', 'A collection of 14 more short stories by Stephen King, all of which have a dark and unsettling tone. From a man who receives messages from the future to a woman who must confront her deepest fears.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Trail of Broken Wings', 14.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-12.jpg', 4, 'John Smith', 352, 'Penguin Random House', 'English', '2015-05-19', 'A powerful and emotional novel about the secrets and betrayals that can break a family apart.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('The Glassblower', 12.99, 1, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-13.jpg', 1, 'Jane Doe', 448, 'HarperCollins', 'English', '2016-03-01', 'A captivating historical fiction novel about a family of glassblowers in 19th century Germany.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('Frozen Stories', 7.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-14.jpg', 2, 'Sarah Lee', 64, 'Disney Press', 'English', '2014-09-02', 'A collection of short stories based on the hit Disney movie Frozen.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('5-Minute Stories', 9.99, 0, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-16.jpg', 3, 'Tom Smith', 192, 'Disney Press', 'English', '2019-01-08', 'A collection of short stories featuring beloved Disney characters, perfect for bedtime reading.');

INSERT INTO BOOK (title, price, on_sale, image_url, author_id, cover_designer, pages, publisher, lang, released, description)
VALUES ('The Forgotten Garden', 11.99, 1, 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/book-17.jpg', 4, 'Anne Doe', 560, 'Washington Square Press', 'English', '2009-02-03', 'A mysterious and enchanting novel about a woman who discovers a long-hidden family secret while searching for her roots.');

/*CATEGORY*/
INSERT INTO CATEGORY_BOOK (category, book_isbn)
VALUES
    ('Drama', 1),
    ('Inspiration', 1),
    ('Love Story', 2),
    ('Life Style', 2),
    ('Business', 3),
    ('Culture', 4),
    ('Science', 5),
    ('Life Style', 6),
    ('Culture', 7),
    ('Drama', 8),
    ('Love Story', 9),
    ('Business', 10),
    ('Inspiration', 11),
    ('Science', 12),
    ('Drama', 13),
    ('Culture', 14),
    ('Life Style', 15),
    ('Business', 16);

/*BLOG*/
INSERT INTO BLOG (title, banner_url, publish_date, tag, content)
VALUES ('Everything You Need To Know About Blogging', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/blog-01.jpg', '2015-06-28', 'DREAM, IDEA, NOVEL', 'People communicate differently than they used to thanks to technology that didn’t exist before. Blogging is hot right now, and this article can help you to take advantage of that.

Make use of a mind map. Organizing your blog into a mind-map, using the categories, posts, promotion and all of your income sources can be a great method of organization. It creates a way for you to see where your blog is lacking and what you can do to make it more successful.

Everything you do can end up being the subject of a blog. Take notes when you are away from the computer, if you stumble across an idea that may translate into a post. You want to always keep your eyes open for subject ideas. Writing is the easy part, it’s coming up with the initial concept that usually leads to writer’s block.

Blog about interesting things and provide relevant content. Nobody wants to read a saga about doing the dishes and cleaning the bathroom every day. Unless you have a unique way of presenting such common information, your readers really aren’t going to care. Choose topics that are sure to be interesting. Keep in mind that your overall goal is to gain regular readers for your site.

Since blogging is on a personal level you should avoid writing formally. You should still write in a professional manner and use proper grammar. Your readers will be able to relate to you more when you are writing to them in a casual way and will continue reading your blogs.

Simplify your blog by avoiding inordinate amounts of multi-media. While pictures and the occasional video are definitely a nice touch, your words are more important than your ability to place obnoxious GIFs or pictures on your blog posts. Your readers will appreciate having balance in your posts and enjoying both written word and visual elements.

You should let visitors leave comments on your blog posts. This helps you build up connections with other bloggers, which is a helpful tool. Do not underestimate the power in having good relationships with others. If you need a hand at some point, the blogger that posted on your site may be happy to help.

Give your readers the opportunity to subscribe to your blog and your RSS feed. When people can have good content delivered hot and fresh, you increase your value to them ten fold. Keep the subscribe button in an easy to find place and deliver good content regularly to dissuade readers from discontinuing.

Don’t make your blog look too crowded or your readers will go elsewhere. If you jumble everything together, trying to get the most material you can get on one page, readers will become overwhelmed. Carefully determine what is important to include on a page, and what is better reserved for the next page.

Posting images to your blog is a great way to add interest. Public domain photographs can be found online for free, with a little searching or you can add your own photographs. Visual interest is important because if a blog does not capture the interest of your visitors they will not stick around for very long. So, spice up your blog with images that reflect your content.

People the world over can potentially view your blog, so be mindful of this. You voice could influence the actions of many people. Remember that your blog could have a major impact on others, as well as yourself, and strive to make it as good as you can. Hopefully, the tips and tricks that you have just taken a look at can help you propel your blog to the highest possible level of quality.

');

INSERT INTO BLOG (title, banner_url, publish_date, tag, content)
VALUES ('Building A Brighter Future With A Successful Blog', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/blog-02.jpg', '2015-06-28', 'DREAM, IDEA, NOVEL', 'Most blogs are focused on one issue. Whether you want to create a blog dedicated to your passion, or you simply want to improve your current blog, the information in this article will help you. Read on to find out how you can join the hordes of already successful online bloggers.

Take any ideas as you get them for blogging. Make sure to create a place where they can be stored. Writing just when inspired can be unproductive to your blog. Many times, the best ideas can appear when you’re not able to blog. So give them a place to grow and flourish.

When running a blog, make sure that you ask open-ended questions. One of the most effective methods of getting people to respond to your posts is simply asking for it. Let your readers answer your questions by inviting them to respond with a comment. This makes them feel more engaged, which increases the odds that they’ll stick with you.

If you want to be a good writer, it is important that you are a good reader. Take the time to actually read what you write about, and enjoy it. When you can read it from a visitor’s point of view, you will be able to get a better understanding of any changes that you need to make to your writing style.

Providing an RSS-to-Email option is a great tip for those running a blog. This can be used so that readers have the ability to subscribe to all your latest posts without needing an RSS reader. Even today, lots of people do not use RSS, so using a RSS-to-Email service is crucial. An excellent choice for one is Feedburner.

Think of your blog posts as travelers. When you have clicked the publish button, the blog post will continue to survive on its own. Your blog post then becomes a traveler. Try giving your posts what they need to deal with any harsh conditions, along with good instructions on how to prosper online.

Learn everything you can about topics related to your blog. The more quality information you can share, the better your blog will be. The greater your knowledge, the more readers will view you as an expert in the field. This will make the reader more likely to share links to your blog with their contacts.

When you are attempting to select a topic that will be the basis of your blog, you should make sure that you are interested in your topic. You can’t expect to maintain a blog whose topic doesn’t interest you in anyway. Selecting a topic that you love increases the chance that you’ll stick with continually updating your blog, which will generate new readers.

Use a lot of plug-ins on your blog because it gives users the motivation to stick around and explore more of your site. The longer you have someone on your site the more likely they will be to make a purchase. “Most popular posts” and “relevant posts” are just a couple of the most popular plug-ins.

Many people overlook the importance of having a keyword rich URL. Having a URL that has keywords related to your article will instantly boost the chances that your site will be seen by someone that is searching the internet on the various search engines. This is a simple step that you can take that will increase your viewership for your blog.

Hopefully, you’ve been able to digest what you’ve read here and benefit from it! It’s completely normal if you’re feeling somewhat overwhelmed right now. The work involved in making your own blog and maintaining it can be hard, but rewarding work. If you use the tips in this article and save it, you will have it as a resource whenever you need some help
');

INSERT INTO BLOG (title, banner_url, publish_date, tag, content)
VALUES ('Blogging And How You Can Get A Lot From It', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/blog-03.jpg', '2015-06-28', 'DREAM, IDEA, NOVEL', 'Whether you’re just looking to type about a hobby you have or if you want to attempt to run a business, starting a blog might be worthy of your consideration. Before you get started, first take a few minutes to read these expert-provided tips below. Once you learn about blogging, the process becomes a lot simpler.

Create a blogroll. A blogroll is a list of other blogs in your niche that you find valuable. Creating such a list increases your blog’s value to readers, as they may be able to find content that they couldn’t find on your blog. If you use your blog for marketing, a blogroll will also increase your credibility in the marketplace.

Keep your readers’ attention by reducing the text blocks. If your readers see a large, ongoing length of text, they are apt to move on. This intimidates the viewers sense of comfort and ease of reading. They will anticipate a more interesting read if they see small chunks of text, that are easy on the eyes.

Try posting in advance. Do not be shy, or think that it can ruin the authenticity of your blog. As long as you remain the author that writes timeless content, there won’t be any problems. Posting in advance can be a good strategy to use, and it can relieve your stress by already covering something ahead of time.

Think of your blog posts as travelers. When you have clicked the publish button, the blog post will continue to survive on its own. Your blog post then becomes a traveler. Try giving your posts what they need to deal with any harsh conditions, along with good instructions on how to prosper online.

To help you get more traffic to your blog and keep up with the latest trends, you should focus some of your attention on submitting your post and blog links to social bookmarking sites. Sites such as Digg, StumbleUpon, Reddit, are all great places where you can submit your blog links.

Getting involved with affiliate marketing is a great way to generate income from your blog. It can be very effective since you get to decide which products to promote. You should always try to promote products that are related to your blog posts. Doing this will not only help you make money, but will also provide your readers with links to products they might be interested in purchasing.

Avoid being a blogger who offers no unique content on your blog. You cannot expect to have success by running a blog that is very similar to other blogs. Offering unique content that is not found anywhere else within your niche is the right path towards finding success with your blog.

Take time to read over your blog. This step tends to be ignored quite often. You have to be the first reader. Whenever you have some free time, try reading some of your older posts. It can really help you see what you can do to improve with your posts in the future.

Avoid thinking of blogging as a simple thing. You should constantly develop new strategies, learn new techniques and treat your blog as a revenue source. Learn from other seasoned bloggers, and incorporate different strategies and techniques that you pick up along the way. Continuously improve and learn about new blogging methods that will help you move forward.

Having accurate information to refer to through the blogging process is a big positive. For every successful blog out there, you can bet that there are hundreds that it not. Use what you’ve learned in the article and avoid becoming one of the many; you should aim to be one of the few.'
);

INSERT INTO BLOG (title, banner_url, publish_date, tag, content)
VALUES ('Expert Advice On Building A Better Blogging Plan', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/blog-04.jpg', '2015-06-28', 'DREAM, IDEA, NOVEL', 'While getting the hang of new technology may overwhelm you at first, blogging is simple enough that nearly anyone can participate. Of course, there is a certain level of skill and creativity involved with developing a captivating blog, but you can learn what you do not know and cultivate your skills to really get your message across to website visitors.

If you are interested in blogging, but you don’t particularly like to write, try starting a blog about one of your creative talents. You could try a photography blog and share your hobby with others. Or you may write poetry or music that you could post samples of. If people like what you have to offer, they will come back for more.

To garner more interest in your blog, a great idea is to comment on other blogs. If you like Google reader, create a separate folder in it for other blogs you’re following. Visit these sites regularly and, when you do, leave comments.

Harness the power of web 3.0. The web isn’t just text anymore, so neither should your blog. Use many different types of content to enhance your blog posts. For instance, if you are posting about a trade show in your niche, add a Youtube video of the event so that people can experience it more directly. If you are posting about a new product, include a Flash product demonstration.

Make controversial posts. We all know this is what keeps readers coming back for more. Think about it, if you write a post that everyone agrees with, it will get boring and many people won’t want to read it. When you write controversial things it will keep readers coming back for more.

Write about what you know. When blogging, in particular, it is important to write about what you actually know and understand. You could, of course, put a spin on a blog by talking about how you really don’t understand something. For the most part, however, your readers are going to be interested in your expertise and knowledge.

Maintain the health of your blog. Doing so means maintaining your blog properly and varying things from time to time. This will ensure that your blog functions properly and prevent your visitors from becoming bored with your site.

Make a publishing filter. Be controlled and consistent with your blog posts. Try to make a publishing filter for use each time you write. It could be as simple as writing down some questions that your post can answer by the time it’s finished. It can help keep you focused.

If you are wanting to run a potentially profitable blog, you should ensure that your niche is one that is very marketable to others. Although it’s important to select a topic that interests you, you can’t simply go by that because some topics aren’t very marketable. This is fine if you don’t care about making money with your blog. Otherwise, marketability is extremely important.

Use empty space to improve visual interest in your page. There is a reason why those who produce hard copy material abide by certain formatting rules. Margins, spacing between lines and blocks of text, and even spacing between sentences is important to the overall visual effect of your blog.

As you see now, blogging can enhance the online experience for visitors to your website and will in turn, create the desired results of increased sales. If clients and business associates enjoy the time they spend becoming informed about your products and services, they will be more likely to purchase them. Apply the concepts you’ve learned here and start blogging today.'
);

INSERT INTO BLOG (title, banner_url, publish_date, tag, content)
VALUES ('Excellent Blogging Tips: A Smart Place To Start!', 'https://demo.tokopress.com/bookie/wp-content/uploads/sites/7/2016/06/blog-05.jpg', '2015-06-28', 'DREAM, IDEA, NOVEL', 'A lot of individuals today desire to have lots of people know of their presence online. Having an audience is a good way to be successful in different marketing areas. Blogging is a great way to build an audience and establish your voice. Check out this article for tips and advice about blogging that will help you get started.

Make sure that you do not have duplicate content. You can check for this by using the robots that are out there. If you do have content that is duplicated, the search engines will probably tag your site for spam, and you will not wind up getting the attention that you are looking for.

Make sure that you are accepting and submitting valuable comments. You want to have as many ways as possible for a back link to happen. When you do comment, add your URL so that you will have a link created to your blog. This will make it easy for others to find you.

Make sure that you are productive with your blog. Do not allow yourself to waste your time watching television, or playing games when you could be doing things to make your blog bring in more visitors. When you are using a blog to make money, you are going to have to put the work hours into it.

Avoid writing blogs about subjects you have no interest in or know nothing about. It will reflect in your writing and you could possibly come across as uninformed in you are unsure of what you are writing about. This can turn readers off and they will avoid revisiting your site.

Try doing some writing challenges. Push yourself by completing writing exercises. Try choosing a number of words per every post. Try writing personal stories. Create a how-to. Try writing a 100 item list. Write a specified number of posts within a certain time frame. Try expanding your skills beyond what you already possess.

Guest blogging can be your best friend when it comes to leading readers to your own blog. Find a good, relevant blog whose owner will allow you to post. Then create some awesomely written posts and make them stand out among other guest posts. Use this tool to give readers a taste of what they can find by hopping over to your blog!

When formatting a blog it is important that you keep the design clean and readable. You want your viewers to enjoy the experience of reading your blog. One way to make a great blog design is to pick a light background, preferably white, and choose text that is a very dark shade. This contrast will make it easy for your visitors to easily read your every word.

Consider making posts that contain fun lists, like a “top ten,” or whatever number you desire. You can do this on a regular basis, enticing your readers to see what interesting list you conceive next. You can use bullets or numbers, with links to greater content included in each one.

Use bulleting to ensure that certain points stand out in your blog. Bulleting is used in traditional print media as well. That is because it makes even difficult to digest material more manageable for readers. Bulleting should be reserved, of course, for delineating the most important parts of your text.

Make sure that you post content to your blog on a regular basis or you can lose readers. When readers subscribe to your blog, they do so because they have a genuine interest in what you have to say. Leaving them hungry for information will, most likely, lead them to go seek new content elsewhere.

Hopefully, this article has given you a deeper understanding of a blog’s importance, and the skills that you can use to build a great one. Use what you’ve learned here to reach great blogging success in short order!'
);
