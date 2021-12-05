rm -rf dashboard/public && rm -rf nise/public && rm -rf institute/public  && rm -rf youth/public
cp public -R dashboard/public && cp public -R nise/public && cp public -R institute/public  && cp public -R youth/public

yarn && yarn build:nise && yarn build:institute && yarn build:admin && yarn build:youth

pm2 stop nise && pm2 delete nise && pm2 start yarn --name "nise" --interpreter bash -- start:nise
pm2 stop institute && pm2 delete institute && pm2 start yarn --name "institute" --interpreter bash -- start:institute
pm2 stop admin && pm2 delete admin && pm2 start yarn --name "admin" --interpreter bash -- start:admin
pm2 stop youth && pm2 delete youth && pm2 start yarn --name "youth" --interpreter bash -- start:youth

pm2 save && pm2 list && netstat -tulpn | grep LISTEN
