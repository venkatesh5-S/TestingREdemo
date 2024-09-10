#Stage 1: Build the application
FROM node:18 as build-stage

# Set the working directory
RUN mkdir /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@latest

RUN npm install --save-dev cross-env


# Copy the entire project
COPY . .

# Build the node.js application
# RUN npm run build:dev

# Stage 2: Use Nginx to serve the built Vue.js application
FROM nginx:alpine as production-stage


# Copy the built assets from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html


COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY .env.development .
# ENV VITE_API_BASE_URL=http://
#RUN restorecon -v -R /etc/nginx
# Expose port 80
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

##########################################################################################
## Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Optionally, run build steps here if applicable
# RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

# Only install production dependencies
RUN npm ci --only=production

EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=development && nest start --watch

CMD ["node", "dist/main.js"]
