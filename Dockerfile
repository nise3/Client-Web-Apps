FROM node:14

# Install Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app dependency files
ADD package.json yarn.lock /tmp/

# Install packages and link to tmp file
RUN cd /tmp && yarn
RUN cd /usr/src/app && ln -s /tmp/node_modules

# Bundle app source
COPY . /usr/src/app

RUN yarn install
EXPOSE 3000
CMD ["npm", "start"] 