FROM node

# make a directory for the service
WORKDIR /app

# install dependencies
COPY package.json .
RUN npm install

# copy source code
COPY . .

# expose registry port
EXPOSE 8002

# run the service
CMD ["node", "registry.js"]
