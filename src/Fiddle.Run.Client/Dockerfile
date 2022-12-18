# base image
FROM node:18.12.0-alpine AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# run build
RUN npm run build -- --prod

# publish server
FROM nginx:1.13.12-alpine as publish

COPY --from=build /app/dist/fiddle /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf