--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2021-02-05 14:33:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
CREATE TABLE public.affiliation (
    id integer NOT NULL,
    affiliation character varying(255),
    "n_users" integer,
    ts timestamp without time zone
);

ALTER TABLE public.affiliation OWNER TO dv_harvester;

COMMENT ON TABLE public.affiliation IS 'The user affiliation metrics table.';
COMMENT ON COLUMN public.affiliation.affiliation IS 'The affiliation.';
COMMENT ON COLUMN public.affiliation."n_users" IS 'Number of users matching the affiliation.';
COMMENT ON COLUMN public.affiliation.ts IS 'Timestamp in UTC';

--
CREATE SEQUENCE public.affiliation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.affiliation_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.affiliation_id_seq OWNED BY public.affiliation.id;

--
CREATE TABLE public.categories (
    id integer NOT NULL,
    category character varying(255),
    "n_dataverses" integer,
    ts timestamp without time zone
);

ALTER TABLE public.categories OWNER TO dv_harvester;

COMMENT ON TABLE public.categories IS 'The categories metrics table.';
COMMENT ON COLUMN public.categories.category IS 'The name of the category.';
COMMENT ON COLUMN public.categories."n_dataverses" IS 'Total number of dataverses matching the category.';
COMMENT ON COLUMN public.categories.ts IS 'Timestamp in UTC';

--
CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.categories_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;

--
CREATE TABLE public.content_type (
    id integer NOT NULL,
    content_type character varying(255),
    "n_files" integer,
    ts timestamp without time zone
);

ALTER TABLE public.content_type OWNER TO dv_harvester;

COMMENT ON TABLE public.content_type IS 'The content type metrics table.';
COMMENT ON COLUMN public.content_type.content_type IS 'The content type.';
COMMENT ON COLUMN public.content_type."n_files" IS 'Number of files matching the content type.';
COMMENT ON COLUMN public.content_type.ts IS 'Timestamp in UTC';

--
CREATE SEQUENCE public.content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.content_type_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.content_type_id_seq OWNED BY public.content_type.id;

--
CREATE TABLE public.dataset (
    id integer NOT NULL,
    dataset_id character varying(255),
    "n_filecount" integer,
    "n_size" integer,
    "n_versions" integer,
    "n_draft_versions" integer,
    "n_views" integer,
    "n_unique_views" integer,
    "n_downloads" integer,
    "n_unique_downloads" integer,
    "n_citations" integer,
    ts timestamp without time zone
);

ALTER TABLE public.dataset OWNER TO dv_harvester;

COMMENT ON TABLE public.dataset IS 'The dataset metrics table.';
COMMENT ON COLUMN public.dataset.dataset_id IS 'The dataset persistent id';
COMMENT ON COLUMN public.dataset."n_filecount" IS 'The number of files in the dataset.';
COMMENT ON COLUMN public.dataset."n_size" IS 'Dataset size in Bytes.';
COMMENT ON COLUMN public.dataset."n_versions" IS 'Dataset number of versions.';
COMMENT ON COLUMN public.dataset."n_draft_versions" IS 'Dataset number of draft versions';
COMMENT ON COLUMN public.dataset."n_views" IS 'Dataset number of views';
COMMENT ON COLUMN public.dataset."n_unique_views" IS 'Dataset number of unique views';
COMMENT ON COLUMN public.dataset."n_downloads" IS 'Dataset number of downloads';
COMMENT ON COLUMN public.dataset."n_unique_downloads" IS 'Dataset number of unique downloads';
COMMENT ON COLUMN public.dataset."n_citations" IS 'Dataset number of citations';
COMMENT ON COLUMN public.dataset.ts IS 'timestamp in UTC';

--
CREATE SEQUENCE public.dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.dataset_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.dataset_id_seq OWNED BY public.dataset.id;

--
CREATE TABLE public.dataverse (
    id integer NOT NULL,
    dataverse_id character varying(255),
    "n_datasets" integer,
    "n_size" integer,
    ts timestamp without time zone
);

ALTER TABLE public.dataverse OWNER TO dv_harvester;

COMMENT ON COLUMN public.dataverse.dataverse_id IS 'Dataverse persistent id';
COMMENT ON COLUMN public.dataverse."n_datasets" IS 'Number of Datasets in the Dataverse';
COMMENT ON COLUMN public.dataverse."n_size" IS 'Size in Bytes.';
COMMENT ON COLUMN public.dataverse.ts IS 'A timestamp stored in UTC';

--
CREATE SEQUENCE public.dataverse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.dataverse_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.dataverse_id_seq OWNED BY public.dataverse.id;

--
CREATE TABLE public.keywords (
    id integer NOT NULL,
    keyword character varying(255),
    "n_datasets" integer,
    ts timestamp without time zone
);

ALTER TABLE public.keywords OWNER TO dv_harvester;

COMMENT ON TABLE public.keywords IS 'The keywords metris table.';
COMMENT ON COLUMN public.keywords.keyword IS 'The dataset keyword.';
COMMENT ON COLUMN public.keywords."n_datasets" IS 'Number of datasets matching the keyword.';
COMMENT ON COLUMN public.keywords.ts IS 'Timestamp in UTC';

--
CREATE SEQUENCE public.keywords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.keywords_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.keywords_id_seq OWNED BY public.keywords.id;

--
CREATE TABLE public.roles (
    id integer NOT NULL,
    role character varying(255),
    "n_users" integer,
    ts timestamp without time zone
);

ALTER TABLE public.roles OWNER TO dv_harvester;

COMMENT ON TABLE public.roles IS 'The user roles metrics table.';
COMMENT ON COLUMN public.roles.role IS 'The user roles.';
COMMENT ON COLUMN public.roles."n_users" IS 'Number of users matching the role.';
COMMENT ON COLUMN public.roles.ts IS 'Timestamp in UTC';

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.roles_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;

--
CREATE TABLE public.subjects (
    id integer NOT NULL,
    subject character varying(255),
    "n_datasets" integer,
    ts timestamp without time zone
);

ALTER TABLE public.subjects OWNER TO dv_harvester;
COMMENT ON TABLE public.subjects IS 'The subjects metrics table.';
COMMENT ON COLUMN public.subjects.subject IS 'The subject.';
COMMENT ON COLUMN public.subjects."n_datasets" IS 'total number of datasets matching the subject.';
COMMENT ON COLUMN public.subjects.ts IS 'Timestamp in UTC';

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.subjects_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;

--
CREATE TABLE public.totals (
    id integer NOT NULL,
    "n_dataverses" integer,
    "n_datasets" integer,
    "n_files" integer,
    "n_users" integer,
    ts timestamp without time zone
);

ALTER TABLE public.totals OWNER TO dv_harvester;

COMMENT ON TABLE public.totals IS 'Totals table. Containing the total dataverses, datasets, files and users.';
COMMENT ON COLUMN public.totals."n_dataverses" IS 'Total number of dataverses';
COMMENT ON COLUMN public.totals."n_datasets" IS 'Total number of datasets.';
COMMENT ON COLUMN public.totals."n_files" IS 'Total number of files';
COMMENT ON COLUMN public.totals."n_users" IS 'Total number of users.';
COMMENT ON COLUMN public.totals.ts IS 'Timestamp in UTC';

CREATE SEQUENCE public.totals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.totals_id_seq OWNER TO dv_harvester;
ALTER SEQUENCE public.totals_id_seq OWNED BY public.totals.id;

ALTER TABLE ONLY public.affiliation ALTER COLUMN id SET DEFAULT nextval('public.affiliation_id_seq'::regclass);
ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
ALTER TABLE ONLY public.content_type ALTER COLUMN id SET DEFAULT nextval('public.content_type_id_seq'::regclass);
ALTER TABLE ONLY public.dataset ALTER COLUMN id SET DEFAULT nextval('public.dataset_id_seq'::regclass);
ALTER TABLE ONLY public.dataverse ALTER COLUMN id SET DEFAULT nextval('public.dataverse_id_seq'::regclass);
ALTER TABLE ONLY public.keywords ALTER COLUMN id SET DEFAULT nextval('public.keywords_id_seq'::regclass);
ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);
ALTER TABLE ONLY public.totals ALTER COLUMN id SET DEFAULT nextval('public.totals_id_seq'::regclass);
COPY public.affiliation (id, affiliation, "n_users", ts) FROM stdin;
\.


--
-- TOC entry 2893 (class 0 OID 16653)
-- Dependencies: 209
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.categories (id, category, "n_dataverses", ts) FROM stdin;
\.


--
-- TOC entry 2899 (class 0 OID 16677)
-- Dependencies: 215
-- Data for Name: content_type; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.content_type (id, content_type, "n_files", ts) FROM stdin;
\.


--
-- TOC entry 2889 (class 0 OID 16637)
-- Dependencies: 205
-- Data for Name: dataset; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.dataset (id, dataset_id, "n_filecount", "n_size", "n_versions", "n_draft_versions", "n_views", "n_unique_views", "n_downloads", "n_unique_downloads", "n_citations", ts) FROM stdin;
\.


--
-- TOC entry 2887 (class 0 OID 16629)
-- Dependencies: 203
-- Data for Name: dataverse; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.dataverse (id, dataverse_id, "n_datasets", "n_size", ts) FROM stdin;
\.


--
-- TOC entry 2897 (class 0 OID 16669)
-- Dependencies: 213
-- Data for Name: keywords; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.keywords (id, keyword, "n_datasets", ts) FROM stdin;
\.


--
-- TOC entry 2901 (class 0 OID 16685)
-- Dependencies: 217
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.roles (id, role, "n_users", ts) FROM stdin;
\.


--
-- TOC entry 2895 (class 0 OID 16661)
-- Dependencies: 211
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.subjects (id, subject, "n_datasets", ts) FROM stdin;
\.


--
-- TOC entry 2891 (class 0 OID 16645)
-- Dependencies: 207
-- Data for Name: totals; Type: TABLE DATA; Schema: public; Owner: dv_harvester
--

COPY public.totals (id, "n_dataverses", "n_datasets", "n_files", "n_users", ts) FROM stdin;
\.


--
-- TOC entry 2964 (class 0 OID 0)
-- Dependencies: 218
-- Name: affiliation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.affiliation_id_seq', 1, false);


--
-- TOC entry 2965 (class 0 OID 0)
-- Dependencies: 208
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 2966 (class 0 OID 0)
-- Dependencies: 214
-- Name: content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.content_type_id_seq', 1, false);


--
-- TOC entry 2967 (class 0 OID 0)
-- Dependencies: 204
-- Name: dataset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.dataset_id_seq', 1, false);


--
-- TOC entry 2968 (class 0 OID 0)
-- Dependencies: 202
-- Name: dataverse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.dataverse_id_seq', 1, false);


--
-- TOC entry 2969 (class 0 OID 0)
-- Dependencies: 212
-- Name: keywords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.keywords_id_seq', 1, false);


--
-- TOC entry 2970 (class 0 OID 0)
-- Dependencies: 216
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- TOC entry 2971 (class 0 OID 0)
-- Dependencies: 210
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.subjects_id_seq', 1, false);


--
-- TOC entry 2972 (class 0 OID 0)
-- Dependencies: 206
-- Name: totals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dv_harvester
--

SELECT pg_catalog.setval('public.totals_id_seq', 1, false);


--
-- TOC entry 2759 (class 2606 OID 16696)
-- Name: affiliation affiliation_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.affiliation
    ADD CONSTRAINT affiliation_pk PRIMARY KEY (id);


--
-- TOC entry 2751 (class 2606 OID 16658)
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- TOC entry 2757 (class 2606 OID 16682)
-- Name: content_type content_type_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.content_type
    ADD CONSTRAINT content_type_pk PRIMARY KEY (id);


--
-- TOC entry 2747 (class 2606 OID 16642)
-- Name: dataset dataset_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.dataset
    ADD CONSTRAINT dataset_pk PRIMARY KEY (id);


--
-- TOC entry 2745 (class 2606 OID 16634)
-- Name: dataverse dataverse_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.dataverse
    ADD CONSTRAINT dataverse_pk PRIMARY KEY (id);


--
-- TOC entry 2755 (class 2606 OID 16674)
-- Name: keywords keywords_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT keywords_pk PRIMARY KEY (id);


--
-- TOC entry 2753 (class 2606 OID 16666)
-- Name: subjects subjects_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pk PRIMARY KEY (id);


--
-- TOC entry 2749 (class 2606 OID 16650)
-- Name: totals totals_pk; Type: CONSTRAINT; Schema: public; Owner: dv_harvester
--

ALTER TABLE ONLY public.totals
    ADD CONSTRAINT totals_pk PRIMARY KEY (id);


-- Completed on 2021-02-05 14:33:36

--
-- PostgreSQL database dump complete
--

