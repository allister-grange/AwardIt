FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY --chown=node:node package*.json tsconfig.json .env ./

FROM base AS dev
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

FROM base AS prod
ENV NODE_ENV production
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production
USER node
COPY --chown=node:node ./src/ ./src/
EXPOSE 3001
CMD [ "npm", "start" ]
