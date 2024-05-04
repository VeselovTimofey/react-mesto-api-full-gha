# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.20.2

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /app

# Copy the rest of the source files into the image.
COPY . .

# Download Dependency
RUN npm install

# Create build
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD npm start