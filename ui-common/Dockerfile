FROM node:14-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
ADD / /app/
EXPOSE 8000
CMD ["npm", "run", "start"]