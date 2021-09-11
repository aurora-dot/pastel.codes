FROM node:10.19.0

ENV IS_DOCKER=true
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "postcss.config.js", "tailwind.config.js", "./"]
RUN npm install
RUN npm build-tail
RUN npm install nodemon
COPY . .

CMD [ "npm", "start" ]
