FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Install app dependencies
COPY package*.json /usr/src/app/
COPY application /usr/src/app/application/
RUN npm install -g nodemon
RUN npm install

EXPOSE ${PORT}
