FROM node:16.13

# make a directory for the service
WORKDIR /app

# install dependencies
RUN npm install -g @angular/cli

# copy source code
COPY . .

# build
RUN npm install
RUN ng build

# expose port
EXPOSE 4200

# run the service
CMD ["npm", "start"]
