# https://expressjs.com/en/advanced/best-practice-performance.html
# https://javascript.plainenglish.io/build-a-production-ready-node-express-api-with-docker-9a45443427a0
# https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/

# docker build -t epflsi/startpage .
# docker run -it epflsi/startpage bash
# docker run -e PORT=1337 -p 3000:1337 epflsi/startpage -d

FROM node:20-slim

LABEL author="EPFL ISAS-FSD"
LABEL version="1.0"
LABEL project="epfl-startpage"

# RUN apt-get -qq update && apt-get -qq -y --no-install-recommends install curl
# RUN apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false
RUN npm install -g pnpm pm2

RUN mkdir -p /home/node/app/src
WORKDIR /home/node/app

COPY package*.json ./
RUN pnpm i --only=production
COPY ./src ./src

# Set internal port
ENV PORT=1337
# Expose desired port
EXPOSE 1337

# Let's be sure to use the user "node"
USER node

# It's a production Docker
ENV NODE_ENV=production

# Use pm2 to run the application
ENTRYPOINT ["pm2-runtime", "./src/server.js"]
