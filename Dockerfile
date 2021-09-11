FROM node:16.8.0

ENV IS_DOCKER=true
ENV NODE_ENV=production

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm install nodemon
COPY . .
RUN npm run build-tailwind

CMD [ "npm", "start" ]
