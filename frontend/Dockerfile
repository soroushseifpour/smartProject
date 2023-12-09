# Use Node.js v16.17.0 as the base image
FROM node:16.17.0 as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json .
COPY package-lock.json .    

# Install dependencies
RUN npm install             

# Copy the rest of the application files to the container
COPY . .

# Build the React app
RUN npm run build             

# Use Nginx as the production server to serve the built React app
FROM nginx:alpine

# Copy the build files from the build stage to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
