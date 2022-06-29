FROM node:16.14.2
WORKDIR /app
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
COPY frontend/ ./
RUN rm -rf node_modules
RUN npm i
CMD ["npm", "run", "start"]