# FROM node:latest

# WORKDIR /app
#  COPY package.json ./


# COPY . .

# RUN npm install -- production 
# RUN npm run build

# CMD [ "npm", "start" ]


FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app




COPY . /app
RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]