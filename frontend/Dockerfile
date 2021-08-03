FROM node:10-alpine

# Create app directory
RUN mkdir -p /app/
WORKDIR /app/

# Install app dependencies
COPY . /app/
# Any command line tools need -g
RUN npm install -g serve
RUN npm install
COPY . /app/
RUN npm run build /app/build/
