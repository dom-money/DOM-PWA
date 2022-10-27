#!/bin/bash
set -e
NODE_VER=16.18.0

source ~/.bashrc

nvm use $NODE_VER
node -v
yarn && yarn build
pm2 restart dom-pwa

exit 0
