# ---- Base Node ----
FROM node:12 AS base
# Create app directory
WORKDIR /opt/app

# ---- Dependencies ----
FROM base AS dependencies

ARG NODE_AUTH_TOKEN

COPY .npmrc.tpl ./.npmrc
# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY .yarnrc package.json yarn.lock* ./
# install app dependencies including 'devDependencies'
RUN yarn cache clean && MONGOMS_DISABLE_POSTINSTALL=1 yarn install

# ---- Copy Files/Build ----
# copy app source to image _after_ yarn install so that
# application code changes don't bust the docker cache of yarn install step
FROM dependencies AS build
WORKDIR /opt/app

ARG NODE_AUTH_TOKEN

COPY . /opt/app

RUN yarn build
RUN yarn install --production
RUN rm -f .npmrc
# --- Release with Slim ----
FROM node:12-alpine AS release
# Create app directory
WORKDIR /opt/app

ARG S3_SECRETS_BUCKET
ARG NODE_CONFIG_ENV

# From dependencies
COPY --from=dependencies /opt/app/package.json ./

# From build
COPY --from=build /opt/app/.docsBuild ./docsBuild
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app ./

ENV PORT 8080
ENV NODE_ENV production
ENV NODE_CONFIG_ENV $NODE_CONFIG_ENV
ENV NODE_PATH ./dist
ENV S3_SECRETS_BUCKET $S3_SECRETS_BUCKET
ENV TZ UTC
EXPOSE 8080

CMD [ "yarn", "start" ]
