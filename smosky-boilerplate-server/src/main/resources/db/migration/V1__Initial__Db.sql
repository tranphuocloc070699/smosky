CREATE TABLE IF NOT EXISTS boilerplate (
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255),
  description TEXT,
  type VARCHAR(50),
  preview_link VARCHAR(255),
  created_at TIMESTAMP NOT NULL ,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS boilerplate_dependencies (
  boilerplate_id INT NOT NULL,
  dependencies VARCHAR(255) NOT NULL,
  CONSTRAINT FK_boilerplate_dependencies_boilerplate FOREIGN KEY (boilerplate_id) REFERENCES boilerplate(id)
);

CREATE TABLE IF NOT EXISTS boilerplate_features (
  boilerplate_id INT NOT NULL,
  features VARCHAR(255) NOT NULL,
  CONSTRAINT FK_boilerplate_features_boilerplate FOREIGN KEY (boilerplate_id) REFERENCES boilerplate(id)
);

CREATE TABLE IF NOT EXISTS review (
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  content TEXT,
  star INT,
  boilerplate_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS tag (
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(255) NOT NULL
);

CREATE SEQUENCE post_id_seq START 1 INCREMENT 1;

CREATE TABLE post (
  id INT PRIMARY KEY,
  thumbnail VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  liked INT DEFAULT 0,
  pre_content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE toc (
  id  SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  post_id INT NOT NULL,
  CONSTRAINT FK_tocs_post FOREIGN KEY (post_id) REFERENCES post(id)
);

ALTER TABLE review ADD CONSTRAINT FK_review_boilerplate FOREIGN KEY (boilerplate_id) REFERENCES boilerplate(id);

-- Assuming a separate table for tags already exists (modify if needed)
ALTER TABLE tag ADD COLUMN boilerplates_id INT;

CREATE TABLE IF NOT EXISTS tag_boilerplate (
  tag_id INT NOT NULL,
  boilerplate_id INT NOT NULL,
  CONSTRAINT FK_tag_boilerplate_tag FOREIGN KEY (tag_id) REFERENCES tag(id),
  CONSTRAINT FK_tag_boilerplate_boilerplate FOREIGN KEY (boilerplate_id) REFERENCES boilerplate(id),
  PRIMARY KEY (tag_id, boilerplate_id)
);

CREATE TABLE IF NOT EXISTS tag_post (
  tag_id INT NOT NULL,
  post_id INT NOT NULL,
  CONSTRAINT FK_tag_post_tag FOREIGN KEY (tag_id) REFERENCES tag(id),
  CONSTRAINT FK_tag_post_post FOREIGN KEY (post_id) REFERENCES post(id),
  PRIMARY KEY (tag_id, post_id)
);
