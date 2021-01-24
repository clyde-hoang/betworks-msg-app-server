FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .
RUN npm install

# Set environment variables
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000
CMD ["node", "index.js"]
