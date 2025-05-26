import json
from requests import Request, Session
import os
from dotenv import load_dotenv
from kafka import KafkaProducer 
from kafka.errors import NoBrokersAvailable 
import requests


load_dotenv()


def draw_data(url, api_key):
    """
    Fetches data from the given URL using the provided API key.

    Args:
        url (str): The URL to fetch data from.
        api_key (str): The API key to use for authentication.

    Returns:
        dict: The JSON response from the API.
    """
    parameters = {
        'start': '1',
        'limit': '1',
        'convert': 'USD',
    }

    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': api_key
    }

    session = Session()
    session.headers.update(headers)
    try:
        response = session.get(url, params=parameters, headers=headers)  
        response.raise_for_status()  
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        raise  


def send_to_kafka(topic, data):
    """
    Sends data to a Kafka topic.

    Args:
        topic (str): The Kafka topic to send data to.
        data (dict): The data to send.
    """
    KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
    if not KAFKA_BROKER_URL:
        raise ValueError("KAFKA_BROKER_URL environment variable is not set")
    
    producer = KafkaProducer(
        bootstrap_servers=KAFKA_BROKER_URL,
        value_serializer=lambda x: json.dumps(x).encode('utf-8'), 
        acks='all',  
        api_version=(7,9),
        linger_ms=20 
    )

    try:
        producer.send(topic, value=data)
        producer.flush()
        print(f"Successfully sent data to topic: {topic}")  
    except NoBrokersAvailable as e:
        print(
            f"Error: Could not connect to Kafka broker at {KAFKA_BROKER_URL}.  Check network and broker status: {e}"
        )
        raise  
    except Exception as e:
        print(f"Failed to send data to Kafka: {e}")
        raise
    finally:
        producer.close()
        print("Kafka producer closed")
