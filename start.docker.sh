#!/bin/bash

docker run -d -it --name mongodb --network rede-local mongo

docker run -it -d -v $(pwd):/var/www --name node-server --network rede-local -p 3000:3000 -w /var/www node

docker exec -it node-server /bin/bash