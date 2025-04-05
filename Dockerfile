FROM node:22-alpine AS build

WORKDIR /opt/src

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

ENV WEB_APP_PROTOCOL="https"
ENV WEB_APP_IP="resumeinsync.kostelidis.dev"
ENV WEB_APP_PORT="443"

ENV API_APP_PROTOCOL="https"
ENV API_APP_IP="resumeinsync.kostelidis.dev"
ENV API_APP_PORT="443"
ENV API_APP_PATH="/api"

ENV API_APP_USERNAME="resumeinsync_api_username"
ENV API_APP_PASSWORD="resumeinsync_api_password"

RUN yarn build:prod

FROM nginx:1.20
COPY --from=build /opt/src/public /usr/share/nginx/html
