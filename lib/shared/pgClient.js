import { Client } from 'pg';
import { POSTGRES_URL } from './config.js';
import { URL } from 'url';
import { logger } from './logger.js';

const url = new URL(POSTGRES_URL);

export const pgClient = new Client ({
    user: url.username,
    password: url.password,
    host: url.hostname,
    port: parseInt(url.port),
    database: url.pathname.substring(1),
}).next(() => {
    logger.info(`Postgres client connected to ${url.pathname.substring(1)}`);
    console.log(`Postgres client connected to ${url.pathname.substring(1)}`);
}) 

