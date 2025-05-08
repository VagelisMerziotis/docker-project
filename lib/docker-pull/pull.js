import { Kafka } from '../kafka.js';
import { Client } from 'pg'; 

KAFKA_BROKER = process.env.KAFKA_BROKER || 'kafka:9092';
KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'coin-market-data-BTC';

// Kafka configuration
const kafka_config = {
    clientId: 'pull-js',
    brokers: [KAFKA_BROKER],
    logLevel: logLevel.INFO
};

const kafka = new Kafka(kafka_config);
console.log('Kafka client created');

const consumer = kafka.consumer({ groupId: 'pull-js-group' });
console.log('Kafka consumer created');

// Postgres configuration
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://myuser:mypassword@database:5432/mydb"
const pg = new Client(DATABASE_URL);
console.log('Postgres client created');

async function run () {
    await consumer.connect()
    await consumer.subscribe({ topic: 'pull-js-group', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ KAFKA_TOPIC, partition, message }) => {
        console.log({
          value: message.value.toString()
        })
      }
    })
    
}

run()
