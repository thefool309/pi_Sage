#!/bin/bash

if [ ! -f .env ]; then
    echo "Creating Default .env file"
      cat <<EOF > .env
    NODE_ENV=development
    DB_HOST=database
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=pisage
    PORT=3000
EOF

fi

exec "$@"