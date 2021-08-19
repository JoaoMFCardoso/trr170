--
-- Banco de dados: metrics
--

-- --------------------------------------------------------

--
-- Estrutura da tabela affiliation
--

CREATE TABLE "affiliations" (
  id SERIAL PRIMARY KEY,
  affiliation varchar(255) NOT NULL,
  n_users integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela categories
--

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "category" varchar(255) DEFAULT NULL,
  "n_dataverses" integer DEFAULT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela content_type
--

CREATE TABLE "content_types" (
  "id" SERIAL PRIMARY KEY,
  "content_type" varchar(255) NOT NULL,
  "n_files" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela dataset
--

CREATE TABLE "datasets" (
  "id" SERIAL PRIMARY KEY,
  "dataset_id" varchar(255) NOT NULL,
  "topic" varchar(255) NOT NULL,
  "n_filecount" integer NOT NULL,
  "n_size" integer NOT NULL,
  "n_versions" integer NOT NULL,
  "n_draft_versions" integer NOT NULL,
  "n_views" integer NOT NULL,
  "n_unique_views" integer NOT NULL,
  "n_downloads" integer NOT NULL,
  "n_unique_downloads" integer NOT NULL,
  "n_citations" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela dataverse
--

CREATE TABLE "dataverses" (
  "id" SERIAL PRIMARY KEY,
  "dataverse_id" varchar(255) NOT NULL,
  "n_datasets" integer NOT NULL,
  "n_size" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela keywords
--

CREATE TABLE "keywords" (
  "id" SERIAL PRIMARY KEY,
  "keyword" varchar(255) NOT NULL,
  "n_datasets" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela roles
--

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "role" varchar(255) NOT NULL,
  "n_users" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela subjects
--

CREATE TABLE "subjects" (
  "id" SERIAL PRIMARY KEY,
  "subject" varchar(255) NOT NULL,
  "n_datasets" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);
-- --------------------------------------------------------

--
-- Estrutura da tabela topics
--

CREATE TABLE "topics" (
  "id" SERIAL PRIMARY KEY,
  "topic" varchar(255) NOT NULL,
  "n_datasets" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

-- --------------------------------------------------------

--
-- Estrutura da tabela totals
--

CREATE TABLE "totals" (
  "id" SERIAL PRIMARY KEY,
  "n_dataverses" integer NOT NULL,
  "n_datasets" integer NOT NULL,
  "n_files" integer NOT NULL,
  "n_users" integer NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);
