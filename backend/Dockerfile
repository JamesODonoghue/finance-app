FROM node:10.20-alpine as development

WORKDIR /root/backend

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]


# FROM node:lts-slim as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/build ./build

