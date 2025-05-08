FROM node:latest-slim
USER root

RUN mkdir app/
WORKDIR /app

COPY ./lib/docker-pull/* /app/
RUN chmod +x /app/

RUN npm init -y
RUN npm install --no-cache -r requirements.txt

CMD ["node", "/app/pull.js"]
