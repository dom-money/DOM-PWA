#!/bin/bash
NODE_VER=16.18.0

echo $PATH

nvm use $NODE_VER
node -v
yarn && yarn build
pm2 restart dom-pwa

exit 0
