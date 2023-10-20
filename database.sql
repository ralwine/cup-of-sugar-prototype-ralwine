
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "group" (
    id SERIAL PRIMARY KEY,
    group_name varchar(50) NOT NULL,
    join_code varchar(50) NOT NULL,
    share_location varchar(100) NOT NULL
);

CREATE TABLE "user" (
  	id SERIAL PRIMARY KEY,
    username varchar(80) NOT NULL,
    password varchar(1000) NOT NULL,
    group_id integer NOT NULL,
    role integer DEFAULT 0,
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    UNIQUE (username)
);

CREATE TABLE "user_profile" (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    name varchar(80) NOT NULL,
    homemade_pref boolean NOT NULL,
    about text,
    imgpath varchar(200),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE "categories" (
    id SERIAL PRIMARY KEY,
    category_type varchar(80) NOT NULL
);

CREATE TABLE "requests" (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    category_id integer NOT NULL,
    item_name varchar(80) NOT NULL,
    description text NOT NULL,
    imgpath varchar(100),
    requested_on date NOT NULL,
    expires_on timestamp NOT NULL,
    fulfilled_on timestamp,
    fulfilled_by_user integer,
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    FOREIGN KEY (category_id) REFERENCES "categories" (id),
    FOREIGN KEY (fulfilled_by_user) REFERENCES "user" (id)
);

CREATE TABLE "offers" (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    category_id integer NOT NULL,
    item_name varchar(80) NOT NULL,
    description text NOT NULL,
    perishable boolean NOT NULL,
    homemade boolean NOT NULL,
    imgpath varchar(100),
    offered_on date NOT NULL,
    best_by date NOT NULL,
    expires_on timestamp NOT NULL,
    claimed_on timestamp,
    claimed_by_user integer,
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (group_id) REFERENCES "group" (id),
    FOREIGN KEY (category_id) REFERENCES "categories" (id),
    FOREIGN KEY (claimed_by_user) REFERENCES "user" (id)
);

CREATE TABLE "allergies" (
    id SERIAL PRIMARY KEY,
    allergy_type varchar(80) NOT NULL
);

CREATE TABLE "dietary_restrictions" (
    id SERIAL PRIMARY KEY,
    restriction_type varchar(80) NOT NULL
);

CREATE TABLE "user_allergies" (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    allergy_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (allergy_id) REFERENCES "allergies" (id)
);

CREATE TABLE "user_dietary_restrictions" (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    user_restriction_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (user_restriction_id) REFERENCES "dietary_restrictions" (id)
);


INSERT INTO "group" (group_name, join_code, share_location)
VALUES ('Sugarland Apartments', 'SL29054a','Lobby area on the first floor by reception desk'), 
('Elm Apartments', 'EL92075a','Rec Room in Building 208'), ('Huxley Apartments', 'HX09528a','Reception Front Desk'), ('The Laker', 'TL29375r','Commons Area on 3rd floor');


INSERT INTO "allergies" (allergy_type)
VALUES ('None'), ('Nuts'), ('Dairy'), ('Gluten'), ('Shellfish'), ('Soy'), ('Eggs'), ('Other');


INSERT INTO "dietary_restrictions" (restriction_type)
VALUES ('Vegetarian'), ('Vegan'), ('Gluten-Free'), ('Dairy-Free'), ('Halal'), ('Kosher'), ('Other'), ('None');


INSERT INTO "categories" (category_type)
VALUES ('Produce'), ('Herbs and Spices'), ('Meat'), ('Seafood'), ('Bread & Bakery'), ('Frozen'), ('Eggs'), ('Baking Supplies'), ('Dairy'), ('Dry Goods'), ('Beverages'), ('Other');
