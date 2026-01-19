FROM node:22
WORKDIR /web
COPY . .
WORKDIR /web/weather-web
RUN npm i
CMD ["npm", "run", "dev"]
EXPOSE 3000