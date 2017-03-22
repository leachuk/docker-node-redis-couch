#FROM node:7.7.3
FROM mhart/alpine-node:7.7.3

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app/src && cp -a /tmp/node_modules /app/

# Define working directory
WORKDIR /app
ADD src /app/src

EXPOSE 8080

CMD ["node", "/app/src/app.js"]