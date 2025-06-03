# Use official Node image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app source code
COPY . .

# Expose the development port
EXPOSE 3000

# Set environment variable to ensure hot reload works in Docker
ENV CHOKIDAR_USEPOLLING=true

# Start the development server
CMD ["npm", "start"]


# # -------FOR PROD----------
# # Use official Node image to build the app
# FROM node:18-alpine AS build

# WORKDIR /app

# # Copy package files and install dependencies
# COPY package.json package-lock.json* ./
# RUN npm install

# # Copy all source files
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Use lightweight Nginx to serve the build folder
# FROM nginx:alpine

# # Copy build output to Nginx html folder
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]
