# NISE3 Platform Admin Panel 


Install it and run:

```sh
yarn install
yarn run dev
```

Developed By SoftBD LTD

```bash
yarn build:admin
yarn build:nise
yarn build:youth
yarn build:institute

pm2 start yarn --name "nise" --interpreter bash -- start:nise
pm2 start yarn --name "admin" --interpreter bash -- start:admin
pm2 start yarn --name "youth" --interpreter bash -- start:youth
pm2 start yarn --name "institute" --interpreter bash -- start:institute
pm2 start yarn --name "industry" --interpreter bash -- start:institute
```
 
Local Deployment:

```bash 
yarn dev:admin
yarn dev:nise
yarn dev:youth
yarn dev:institute
yarn dev:industry
```

