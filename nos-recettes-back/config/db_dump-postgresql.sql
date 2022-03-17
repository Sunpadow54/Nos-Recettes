CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE, 
    pass VARCHAR(255) NOT NULL, 
    is_admin BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL
);

CREATE TABLE ingredients 
(
    id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE
);

CREATE TABLE recipes 
(
    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
	duration VARCHAR(10),
    title VARCHAR(100) NOT NULL,
    preparation TEXT[] NOT NULL,
    img VARCHAR(250),
	category VARCHAR(30),
    CONSTRAINT fk_id_user_r
        FOREIGN KEY (id_user)
        REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipe_ingredients 
(
    id SERIAL PRIMARY KEY,
    id_recipe INT NOT NULL,
	id_ingredient INT NOT NULL,
	quantity INT,
	unit VARCHAR(100),
    CONSTRAINT fk_id_recipe_ri
        FOREIGN KEY (id_recipe)
        REFERENCES recipes(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_ingredient_ri
        FOREIGN KEY (id_ingredient)
        REFERENCES ingredients(id)
);

CREATE UNIQUE INDEX ids_recipe_ingredient
ON recipe_ingredients(id_recipe, id_ingredient);

INSERT INTO ingredients (name) VALUES ('tomate'), ('beurre'), ('huile');
