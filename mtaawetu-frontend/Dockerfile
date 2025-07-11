# Stage 1: Build
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Add bash and envsubst to replace $PORT
RUN apk add --no-cache bash gettext

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy built frontend
COPY --from=build /app/dist .

# Copy and prepare Nginx config
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Tell Nginx to use a dynamic config
ENV PORT=8080
EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
