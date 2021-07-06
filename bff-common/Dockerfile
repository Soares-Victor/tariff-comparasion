FROM node:14-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build
# --------------------------------------------------------------

FROM node:14-alpine
WORKDIR /app
EXPOSE 4000 4001
COPY package*.json ./
COPY .env ./
RUN npm install pm2 -g && npm install --production
COPY --from=builder /app/dist ./dist
CMD ["pm2-runtime", "dist/index.js"]