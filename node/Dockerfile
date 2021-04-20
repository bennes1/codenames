FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app
RUN npm install -g nodemon
RUN npm install

ADD ./node_modules /usr/src/app/node_modules

EXPOSE 8080
