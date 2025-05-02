from kafka import KafkaProducer
import json
import time

KAFKA_BROKER = 'localhost:9092'
KAFKA_TOPIC = 'my_test_topic'

try:
    producer = KafkaProducer(
        bootstrap_servers=KAFKA_BROKER,
        value_serializer=lambda x: json.dumps(x).encode('utf-8')
    )
    print(f"Kafka producer connected to {KAFKA_BROKER}")
except Exception as e:
    print(f"Error connecting to Kafka: {e}")
    exit()

try:
    for i in range(5):
        message = {'count': i, 'timestamp': time.time()}
        producer.send(KAFKA_TOPIC, value=message)
        producer.flush()
        print(f"Sent: {message}")
        time.sleep(1)
except KeyboardInterrupt:
    print("Producer stopped.")
finally:
    producer.close()
