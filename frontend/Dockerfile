FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

FROM node:22-alpine

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 3000
CMD ["serve", "/app/dist", "-l", "3000"]
