FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source

EXPOSE 4000
CMD ["node", "index.js"]
