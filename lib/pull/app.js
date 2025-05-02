import path from 'path';

import { client } from '../shared/pgClient.js'
import  { logger } from '../shared/logger.js';

import {
    GGOOGLE_SHEET_ID,
    GOOGLE_SHEET_TAB_NAME,
    GOOGLE_SERVICE_ACCOUNT_KEY_PATH
} from '../config.js';
import { google } from 'googleapis';

export async function pullDataFromPostgres() {
    // Connect to Postgres
    await client.connect();

    //Run query
    const query = `
        SELECT * FROM crypto_db`

    logger.info('Executing query:', query);
    await client.query(query, (err, res) => {
        if (err) {
            logger.error('Error executing query', err.stack);
        } else {
            console.log('Data from Postgres:', res.rows);
        }
    })

    await client.end();

    // Connect to Google Client
    const scopes = ['https://www.googleapis.com/auth/spreadsheets'];
    const key = readFileSync(str(GOOGLE_SERVICE_ACCOUNT_KEY_PATH));
    if (!key) {
        logger.error('Error reading service account key file');
        return;
    }
    const auth = new google.auth.GoogleAuth({
        credentials: JSON.parse(key),
        scopes: scopes
    })
    logger.info('Connecting to Google Client...');
    const googleClient = await auth.getClient();
    
    
}