FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

FROM node:22-alpine

COPY --from=build /app/dist /app/dist
COPY --from=build /app/serve.mjs /app/serve.mjs

EXPOSE 3000
CMD ["node", "/app/serve.mjs"]
