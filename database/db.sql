-- Database: web_app_for_book_readers_db
-- DROP DATABASE IF EXISTS web_app_for_book_readers_db;

CREATE DATABASE web_app_for_book_readers
	WITH
	OWNER = postgres
	ENCODING = 'UTF8'
	LC_COLLATE = 'Hungarian_Hungary.1250'
	LC_CTYPE = 'Hungarian_Hungary.1250'
	TABLESPACE = pg_default
	CONNECTION LIMIT = -1
	IS_TEMPLATE = False;
	
CREATE TABLE user_(
	user_id_ SERIAL PRIMARY KEY,
	username_ VARCHAR(50),
	email_ VARCHAR(255),
	password_hash_ TEXT,
	sign_up_date_ DATE,
	birth_date_ DATE,
	user_img_path_ TEXT,
	location_ VARCHAR(255),
	gender_ CHAR(1),
	role_ CHAR(1)
);

CREATE TABLE friendship_(
	friendship_id_ SERIAL PRIMARY KEY,
	user_id_1_ INT,
	user_id_2_ INT,
	confirmed_ BOOLEAN,
	CONSTRAINT fk_user_1_ FOREIGN KEY(user_id_1_) REFERENCES user_(user_id_),
	CONSTRAINT fk_user_2_ FOREIGN KEY(user_id_2_) REFERENCES user_(user_id_)
);

CREATE TABLE book_(
	book_id_ SERIAL PRIMARY KEY,
	title_ VARCHAR(255),
	subtitle_ VARCHAR(255),
	cover_img_path_ TEXT,
	description_ TEXT,
	published_ DATE,
	approved_ BOOLEAN
);

CREATE TABLE author_(
	author_id_ SERIAL PRIMARY KEY,
	name_ VARCHAR(255),
	description_ TEXT,
	birth_date_ DATE,
	death_date_ DATE,
	author_img_path_ TEXT
);

CREATE TABLE reading_(
	reading_id_ SERIAL PRIMARY KEY,
	user_id_ INT,
	book_id_ INT,
	start_date_ DATE,
	end_date_ DATE,
	CONSTRAINT fk_user_ FOREIGN KEY(user_id_) REFERENCES user_(user_id_),
	CONSTRAINT fk_book_ FOREIGN KEY(book_id_) REFERENCES book_(book_id_)
);

CREATE TABLE review_(
	review_id_ SERIAL PRIMARY KEY,
	user_id_ INT,
	book_id_ INT,
	rating_ INT,
	review_text_ TEXT,
	date_ DATE,
	CONSTRAINT fk_user_ FOREIGN KEY(user_id_) REFERENCES user_(user_id_),
	CONSTRAINT fk_book_ FOREIGN KEY(book_id_) REFERENCES book_(book_id_)
);

CREATE TABLE author_book_(
	author_id_ INT,
	book_id_ INT,
	CONSTRAINT fk_author_ FOREIGN KEY(author_id_) REFERENCES author_(author_id_),
	CONSTRAINT fk_book_ FOREIGN KEY(book_id_) REFERENCES book_(book_id_)
);