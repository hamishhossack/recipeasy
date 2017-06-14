FROM node:7-alpine

ENV NODE_ENV $env

RUN npm i -g gulp

ADD . /opt/applications/reacipeasy-api

WORKDIR /opt/applications/reacipeasy-api

RUN npm install

EXPOSE 3000

CMD /usr/local/bin/gulp serve
