FROM python:3.14.0a7-slim-bookworm

USER root

RUN mkdir scripts/
WORKDIR /scripts

RUN mkdir scripts

RUN chmod +x /scripts

COPY ./lib/python/requirements.txt /scripts/requirements.txt
COPY ./lib/python/draw_data.py /scripts/draw_data.py
COPY ./lib/python/utilities.py /scripts/utilities.py

RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r /scripts/requirements.txt

CMD ["python3", "/scripts/draw_data.py"]
