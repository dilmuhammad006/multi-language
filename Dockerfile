FROM node:23-alpine
WORKDIR /multilanguage
COPY package*.json .
RUN npm i -f
COPY . .
CMD ["npm", "run", "start:dev"]
