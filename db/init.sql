CREATE TABLE public.star_products (
	name_product varchar NULL,
	description varchar NULL,
	price float4 NULL,
	id serial4 NOT NULL,
	CONSTRAINT star_products_pk PRIMARY KEY (id)
);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('Hire', 'test description', 10.02);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('Learn', 'test description 2', 101.02);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('Perform', 'test description 3', 3333);

INSERT INTO public.star_products
(name_product, description, price)
VALUES('Insights', 'test description 3', 3333);