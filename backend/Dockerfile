FROM node:lts-alpine
ENV DB_HOST=database
ENV DB_USER=postgres
ENV DB_PASSWORD=12345
ENV DB_DATABASE=postgres
ENV DB_PORT=5432
ENV TOKEN_SECRET=MIp5OJVffkiHm73Z
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
RUN chown -R node /app
USER node
CMD ["npm", "start"]