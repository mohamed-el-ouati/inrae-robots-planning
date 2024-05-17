--
-- PostgreSQL database cluster dump
--

-- Started on 2024-05-13 13:48:00

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:VL7Lqw03wH4Cj080CTZwTQ==$LojZFENtJrvBvr9zOHwgV8LLTgNiy+IExDeK7pWUpRQ=:XYuOBe8S8l+cbkAo4hgvD5hBs7Pt9Dp1xHgzVJ2rDJU=';

--
-- User Configurations
--








-- Completed on 2024-05-13 13:48:00

--
-- PostgreSQL database cluster dump complete
--

