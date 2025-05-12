#!/bin/bash

# Ensure /sbin and /usr/sbin are in the PATH so that the 'ip' command can be found.
export PATH=$PATH:/sbin:/usr/sbin

# If the .env file doesn't exist, create it.
if [ ! -f .env ]; then
    echo "Creating Default .env file"

    # Determine the default network interface.
    DEFAULT_IF=$(ip route | grep '^default' | awk '{print $5}')

    # Extract the IP with CIDR from the default interface, e.g., "192.168.0.190/24".
    LOCAL_NETWORK=$(ip -o -f inet addr show "$DEFAULT_IF" | awk '{print $4}')
    if [ -z "$LOCAL_NETWORK" ]; then
      echo "Could not determine local network range. Using fallback LOCAL_IP=192.168.1.1"
      LOCAL_NETWORK="192.168.1.1"
    else
      # Extract just the IP portion (e.g., "192.168.0.190")
      LOCAL_NETWORK=${LOCAL_NETWORK%/*}
    fi

    # Generate the .env file with the default values and the detected LOCAL_NETWORK.
    cat <<EOF > .env
VITE_APP_PORT=3000
VITE_APP_LOCAL_NETWORK=$LOCAL_NETWORK
EOF

    echo ".env file generated with VITE_APP_LOCAL_NETWORK=$LOCAL_NETWORK"
fi

# Execute the passed command(s)
exec "$@"
