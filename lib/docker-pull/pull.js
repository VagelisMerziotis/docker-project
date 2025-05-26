import { Kafka } from 'kafkajs';
import { Pool } from 'pg';

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'kafka:9092';
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'coin-market-data-BTC';

// Kafka configuration
const kafka_config = {
  clientId: 'pull-js',
  brokers: [KAFKA_BROKER],
  sasl: {
    mechanism: 'SCRAM-SHA-256', 
    username: 'kafka', //  Add your username
    password: 'kafkapass'
  }
};

const kafka = new Kafka(kafka_config);
console.log('Kafka client created');

const consumer = kafka.consumer({ groupId: 'pull-js-group' });
console.log('Kafka consumer created');
 
// Postgres configuration
const pg_config = {
  user: 'devuser',
  pass: 'devpass',
  host: 'pg_db',
  port: 5432,
  database: 'coin_db'
};
const pool = new Pool(pg_config);
console.log('Postgres client pool created.\n');

async function run() {
  const client = await pool.connect();
  console.log('Postgres client connected');

  await consumer.connect();
  await consumer.subscribe({ topic: 'pull-js-group', fromBeginning: true });

  const response = await consumer.run({
    eachMessage: async (message) => {
      console.log({
        value: message.value.toString()
      });
    }
  });

  if (response.data[0]) {
    const timestamp = response.status.timestamp;
    const btc_data = response.data[0];
    const value = btc_data.value;

    let query = `
      CREATE TABLE IF NOT EXISTS coin_market_data (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP NOT NULL,
        BTC decimal(10,5) NOT NULL
      );
    `;

    // Create the table if it doesn't exist
    await client.query(query);

    const insertQuery = `
      INSERT INTO coin_market_data (timestamp, BTC)
      VALUES (${timestamp}, ${value})
    `;

    // Insert the data into the table
    await client.query(insertQuery);
    console.log('Data inserted into Postgres database');
  }

  client.release();
}

while (true) {
  try {
    await run();
    setTimeout(() => {
      console.log('Consumer is running...');
    }, 1000);
  } catch (error) {
    console.error('Error running the consumer:', error);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
  }
}
