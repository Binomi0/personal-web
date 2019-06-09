FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm run build

CMD ["npm", "start"]

# a23803b31a8d