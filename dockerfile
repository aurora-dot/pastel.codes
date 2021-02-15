FROM node:15.8.0

ENV IS_DOCKER=true
ENV NODE_ENV=production

ARG port
ENV PORT=${port}
EXPOSE ${port}/tcp

ARG ghost_key
ENV GHOST_KEY=${ghost_key}

ARG hcaptcha_key
ENV HCAPTCHA_KEY=${hcaptcha_key}

ARG sendgrid_key
ENV SENDGRID_API_KEY=${sendgrid_key}

ARG mail_to
ENV TO_MAIL_USER=${mail_to}

ARG reply_to
ENV REPLY_TO_MAIL=${reply_to}

ARG mail_from
ENV FROM_MAIL_USER=${mail_from}

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install && npm install nodemon
COPY . .

CMD [ "npm", "start" ]
