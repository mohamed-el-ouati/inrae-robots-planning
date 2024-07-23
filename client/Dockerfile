FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Copy the public directory to the working directory in the container
COPY ./public ./public

# Create files directory
RUN mkdir -p /usr/src/app/files


CMD ["npm", "run", "dev"]