FROM node:lts-slim as development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install --only=development

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]


# FROM node:lts-slim as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/build ./build

