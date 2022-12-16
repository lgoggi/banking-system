FROM node:13-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_BACKEND_URL=http://localhost:8000
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts
COPY . ./
CMD ["npm", "start"]