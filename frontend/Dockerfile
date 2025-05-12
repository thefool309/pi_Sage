# Use the official Node.js image as base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./


RUN apt-get update && apt-get install -y iproute2

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose Vite’s default port (5173)
EXPOSE 5173

# Start the Vite dev server
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "run", "dev"]
