FROM node:18-alpine
#Create app directory, this is in our container/in our image
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE ${PORT}

# Сначала запускаются миграции, потом продакшн сборка
CMD yarn run migrate && yarn run start:prod
