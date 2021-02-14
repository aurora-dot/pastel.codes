FROM node:15.8.0

ENV PORT=
ENV NODE_ENV=
ENV GHOST_KEY=
ENV HCAPTCHA_KEY=
ENV SENDGRID_API_KEY=
ENV TO_MAIL_USER=
ENV REPLY_TO_MAIL=
ENV FROM_MAIL_USER=

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

CMD [ "npm", "start" ]
EXPOSE 7000/tcp
