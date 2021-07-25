# Using multistage build:
# 	https://docs.docker.com/develop/develop-images/multistage-build/

# ------------------ Build IMAGE -----------------------
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:current-alpine as build

# Allow Multi Platform
ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN printf "I am running on ${BUILDPLATFORM:-linux/amd64}, building for ${TARGETPLATFORM:-linux/amd64}\n$(uname -a)\n"

# Install Build Tools
RUN set -x \
    && apk update \
    && apk add \
        bash \
        sudo \
        make \
        gcc \
        g++ \
        python3

# Create the work directory
RUN mkdir -p /usr/src/app

# Set the work directory
WORKDIR /usr/src/app

# Copy all files into the image
COPY . .

# Set the .env
COPY .env.prod .env

# Install all project packages
RUN npm ci 

# Build / Transpile
RUN npm run tsc

# Cleanup packages
RUN npx node-prune

# Remove DevDependencies
RUN npm prune --production

# Prepare build folder
RUN cp ./swagger.json ./build

# Remove unneccessecary files
RUN rm -r ./swagger.json ./src ./test ./Readme.md ./tsconfig.json ./.gitignore ./.eslintrc.json ./.env.prod ./.env.example ./.env.dev ./.env.ci ./Dockerfile

# ------------------ Release IMAGE -----------------------
# Smallest base image
FROM --platform=${TARGETPLATFORM:-linux/amd64} node:current-alpine

LABEL maintainer="TheMardy" \
  org.label-schema.name="avans-api" \
  org.label-schema.description="Avans-API" \
  org.label-schema.vendor="TheMardy" \
  org.label-schema.schema-version="1.0"

# Allow Multi Platform
ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN printf "I am running on ${BUILDPLATFORM:-linux/amd64}, building for ${TARGETPLATFORM:-linux/amd64}\n$(uname -a)\n"

# Install Python (Used for BCrypt)
RUN set -x \
    && apk update \
    && apk add \
        python3

# Create the work directory
RUN mkdir -p /usr/src/app

# Set the work directory
WORKDIR /usr/src/app

# Copy prepared project to production image
COPY --from=build /usr/src/app/. /usr/src/app

# Expose the port.
EXPOSE 3000

# Start the server
CMD ["npm", "run", "prod"]