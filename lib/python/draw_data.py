import time
from datetime import datetime
from utilities import draw_data, send_to_kafka
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

if __name__ == "__main__":
    # Constants
    KAFKA_BROKER_URL = os.environ.get('KAFKA_BROKER_URL')
    KAFKA_TOPIC = os.environ.get('KAFKA_TOPIC')
    URL = os.environ.get('URL')
    API_KEY = os.environ.get('COIN_MARKET_API_KEY')

    while True:
        data = draw_data(url=URL, api_key=API_KEY)
        send_to_kafka(topic=KAFKA_TOPIC, data=data)
        time.sleep(5)
