# Step 1: Use official Node image to build the app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy rest of the code and build it
COPY . ./
RUN npm run build

# Step 2: Use Nginx to serve the build
FROM nginx:stable-alpine

# Copy build output to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
