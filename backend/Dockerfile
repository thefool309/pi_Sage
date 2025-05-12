FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy dependency definitions
COPY entrypoint.sh package*.json tsconfig.json ./


# Install backend dependencies
RUN npm install


# Install nmap and iproute2 necessary dependencies to accomplish proper connections and scanning
RUN apt-get update && apt-get install -y nmap

RUN apt-get update && apt-get install -y iproute2

# Copy the rest of your backend code into the container
COPY . .

# Build the TypeScript files
RUN npm run build

# Copy the entrypoint script and ensure it's executable
RUN chmod +x ./entrypoint.sh

# Expose the port your backend listens on (e.g., 3000)
EXPOSE 3000

# Set the entrypoint to run your startup script, then start the app
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]