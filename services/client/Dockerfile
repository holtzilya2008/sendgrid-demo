FROM node:16.13

# make a directory for the service
WORKDIR /app

# install dependencies
RUN npm install -g @angular/cli

# copy source code
COPY . .

# run the service
CMD ["npm", "start"]
