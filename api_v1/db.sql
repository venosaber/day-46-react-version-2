DROP TABLE IF EXISTS color CASCADE;
CREATE TABLE color
(
    id  bigserial NOT NULL,
    name text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at timestamp with time zone,
    deleted_by bigint,
    active boolean DEFAULT TRUE,
    CONSTRAINT color_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS employee CASCADE;
CREATE TABLE employee
(
    id  bigserial NOT NULL,
    name text,
    age int,
    salary int,
    address text,
    position text,
    status text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at timestamp with time zone,
    deleted_by bigint,
    active boolean DEFAULT TRUE,
    CONSTRAINT employee_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product
(
    id  bigserial NOT NULL,
    name text,
    short_name text,
    code text,
    description text,
    color_id bigint,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at timestamp with time zone,
    deleted_by bigint,
    active boolean DEFAULT TRUE,
    CONSTRAINT product_pkey PRIMARY KEY (id)
);


