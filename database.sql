CREATE TYPE unitate_masura AS ENUM ('mm', 'cm', 'm');
CREATE TYPE tip_produs AS ENUM ('rotunda', 'patrata', 'dreptunghiulara');

CREATE TABLE produse (
    id SERIAL PRIMARY KEY,
    nume VARCHAR(120) NOT NULL,
    latime NUMERIC NOT NULL,
    lungime NUMERIC,
    um unitate_masura,
    tip tip_produs,
    culori TEXT[],
    pret INTEGER NOT NULL CHECK (pret >= 0),
    reducere INTEGER NOT NULL DEFAULT 0 CHECK (reducere >= 0),
    data_adaugarii TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);