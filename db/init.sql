CREATE TABLE public.star_products (
	name_product varchar NULL,
	description varchar NULL,
	price float4 NULL,
	id serial4 NOT NULL,
	CONSTRAINT star_products_pk PRIMARY KEY (id)
);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('product 1', 'test description', 10.02);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('product 2', 'test description 2', 101.02);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('product 3', 'test description 3', 3333);