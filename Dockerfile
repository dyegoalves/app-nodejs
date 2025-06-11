# Dockerfile.dev
FROM node:22

WORKDIR /app

# Instala dockerize
ENV DOCKERIZE_VERSION v0.9.3
RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    | tar xzf - -C /usr/local/bin \
    && apt-get remove -y wget \
    && rm -rf /var/lib/apt/lists/*

# Copia apenas os package.json e instala dependências
COPY package.json package-lock.json ./
RUN npm install

# Instala nodemon globalmente (ou localmente se estiver no package.json)
RUN npm install -g nodemon

# Copia o restante do código (mas será sobrescrito pelo volume no docker-compose)
COPY . .

EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "60s", "npm", "run",  "dev"]
