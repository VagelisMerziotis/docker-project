import { pino } from 'pino';
import path from 'path';
import {
    LOG_DESTIONATION,
    LOG_LEVEL
} from '../config.js';

const options = {
    timestamp: pino.stdTimeFunctions.isoTime,
    level: LOG_LEVEL || 'info',
}

export const logger = pino(options, pino.destination({
    dest: LOG_DESTIONATION || path.join(__dirname, '../logs'),
    sync: false
}));