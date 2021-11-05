FROM node

# make a directory for the service
WORKDIR /app

# install dependencies
RUN npm install -g @nestjs/cli
COPY package.json .
RUN npm install

# copy source code
COPY . .
RUN nest build

# expose registry port
EXPOSE 3001

# run the service
CMD ["nest", "start"]
