# NISE3 Platform Admin Panel 


Install it and run:

```sh
yarn install
```

### Command to Run Local Dev Environment Using ASM PC as API Server
```sh
yarn run dev-local:admin
yarn run dev-local:nise
yarn run dev-local:youth
yarn run dev-local:institute
yarn run dev-local:industry
```
### Command to Run Local Dev Environment Using Dev Server as API Server
```sh
yarn run dev-live:admin
yarn run dev-live:nise
yarn run dev-live:youth
yarn run dev-live:institute
yarn run dev-live:industry
```

### Build Command for Development Server

```bash
yarn build:admin-dev
yarn build:nise-dev
yarn build:youth-dev
yarn build:institute-dev
yarn build:industry-dev
```
# Deployment 
### Build Command for Production Server

```bash
yarn build:admin-prod
yarn build:nise-prod
yarn build:youth-prod
yarn build:institute-prod
yarn build:industry-prod
```
### Commands to Deploy the Web Apps in the Dev/Production Server
```bash
pm2 start yarn --name "nise" --interpreter bash -- start:nise
pm2 start yarn --name "admin" --interpreter bash -- start:admin
pm2 start yarn --name "youth" --interpreter bash -- start:youth
pm2 start yarn --name "institute" --interpreter bash -- start:institute
pm2 start yarn --name "industry" --interpreter bash -- start:industry
```

#Note: Do not merge develop, staging and master with one another

###Deployment Steps
#####1. Update this branch with the latest code
#####2. Open version.yaml file from `deploy` folder.
#####3. To deploy a module change `imageRelease` to `true` and increase `imageAppVersion` to create a new image version
#####4. Deploy build commit is - `RELEASE = any message`
#####5. This will build pipeline in gitlab.
#####6. After build success. Open deploy/module(admin, nise, ....) folder and open values.yaml and change `imageAppVersion` with current version and push to git



