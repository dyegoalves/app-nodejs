FROM node:22 

WORKDIR /app

ENV DOCKERIZE_VERSION v0.9.3

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

RUN npm init -y
RUN npm install express mysql

COPY . .

EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "60s", "node", "index.js"]



