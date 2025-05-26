FROM node:lts-bookworm

WORKDIR /app

COPY package.json /app
RUN npm i 

COPY ./lib/docker-pull/pull.js /app

CMD ["node", "pull.js"]
