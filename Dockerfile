FROM node:10.19.0

ENV IS_DOCKER=true
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install && npm install nodemon
COPY . .

CMD [ "npm", "start" ]
