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
RUN cd /usr/src/app && rm -rf dashboard/public && rm -rf nise/public && rm -rf institute/public  && rm -rf youth/public
RUN cd /usr/src/app && cp public -R dashboard/public && cp public -R nise/public && cp public -R institute/public  && cp public -R youth/public
RUN cd /usr/src/app && yarn build:nise && yarn build:institute && yarn build:admin && yarn build:youth
EXPOSE 3000 3001 3002 3003
CMD ["npm", "staging:start"] 