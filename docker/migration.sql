DROP TABLE IF EXISTS home CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE home (
  id serial PRIMARY KEY,
  type varchar,
  name varchar,
  state varchar,
  city varchar,
  zip integer
);

CREATE TABLE rooms (
  id serial PRIMARY KEY,
  home integer REFERENCES home (id),
  type varchar,
  name varchar
);

CREATE TABLE items (
  id serial,
  category integer REFERENCES category (id),
  name varchar,
  room integer REFERENCES rooms (id)
);

CREATE TABLE category (
  id serial PRIMARY KEY,
  name varchar
);