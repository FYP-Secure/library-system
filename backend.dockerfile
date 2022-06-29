FROM node:16.14.2
WORKDIR /app
COPY backend/package.json ./
COPY backend/package-lock.json ./
COPY backend/ ./
RUN rm -rf node_modules
RUN npm i
CMD ["npm", "run", "start"]