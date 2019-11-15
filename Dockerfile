FROM node:10-alpine

RUN mkdir -p /src/app/

COPY . /src/app/

WORKDIR /src/app

RUN npm install --production

EXPOSE 3059

CMD ["npm", "start"]