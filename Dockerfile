FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache tzdata \
    && chown -R node:node ./
ENV TZ=America/Sao_Paulo
USER node

FROM base AS build
COPY --chown=node:node . .
RUN yarn build

FROM base AS release
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules
COPY .env .
CMD ["node", "index.js"]
