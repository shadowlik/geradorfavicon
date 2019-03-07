FROM node:10-alpine

WORKDIR /app

COPY . .

RUN npm i -g nodemon

RUN npm i

RUN npm run build

EXPOSE 9890

CMD [ "npm", "run", "start" ]