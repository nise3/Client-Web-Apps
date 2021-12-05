yarn
yarn build:nise
pm2 stop nise
pm2 delete nise
pm2 start yarn --name "nise" --interpreter bash -- start:nise

yarn build:institute
pm2 stop institute
pm2 delete institute
pm2 start yarn --name "institute" --interpreter bash -- start:institute

yarn build:admin
pm2 stop admin
pm2 delete admin
pm2 start yarn --name "admin" --interpreter bash -- start:admin

yarn build:youth
pm2 stop youth
pm2 delete youth
pm2 start yarn --name "youth" --interpreter bash -- start:youth
