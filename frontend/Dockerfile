# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:10.20-alpine

# set a directory for the app
WORKDIR /root/frontend

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

COPY . .

# Uses port which is used by the actual application
EXPOSE 3000

# Finally runs the application
CMD [ "npm", "start" ]