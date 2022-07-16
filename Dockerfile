FROM node:16.8.0-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . /app

RUN cd /app && npm install

EXPOSE 3000

CMD ["npm", "start"]
