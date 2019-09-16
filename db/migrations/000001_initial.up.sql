CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS podcastbin;

CREATE TABLE IF NOT EXISTS podcastbin.account (
  id uuid DEFAULT uuid_generate_v4 (),
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS podcastbin.podcast (
  id uuid DEFAULT uuid_generate_v4 (),
name text NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS podcastbin.account_podcast (
  account_id uuid NOT NULL,
  podcast_id uuid NOT NULL,
  CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES podcastbin.account (id),
CONSTRAINT fk_podcast_id FOREIGN KEY (podcast_id) REFERENCES podcastbin.podcast (id),
PRIMARY KEY (account_id, podcast_id)
);

CREATE TABLE IF NOT EXISTS podcastbin.episode (
  id uuid DEFAULT uuid_generate_v4 (),
podcast_id uuid NOT NULL,
title text NOT NULL,
filename text NOT NULL,
size INT NOT NULL,
CONSTRAINT fk_podcast_id FOREIGN KEY (podcast_id) REFERENCES podcastbin.podcast (id),
PRIMARY KEY (id)
);

