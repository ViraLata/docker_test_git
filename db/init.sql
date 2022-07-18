CREATE TABLE public.star_products (
	name_product varchar NULL,
	description varchar NULL,
	price float4 NULL,
	id serial4 NOT NULL,
	CONSTRAINT star_products_pk PRIMARY KEY (id)
);

