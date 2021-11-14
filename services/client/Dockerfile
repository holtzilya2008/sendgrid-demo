FROM node:16.13

# make a directory for the service
WORKDIR /app

# install dependencies
RUN npm install -g @angular/cli
COPY package.json .
RUN npm install

# copy source code
COPY . .
RUN ng build

# expose port
EXPOSE 4200

# run the service
CMD ["npm", "start"]
