FROM node:15.8.0

ENV IS_DOCKER=true
ENV NODE_ENV=production

RUN git clone https://github.com/BlankFaces/pastel.codes.git
WORKDIR pastel.codes

RUN npm install && npm install nodemon
COPY . .

CMD [ "npm", "start" ]