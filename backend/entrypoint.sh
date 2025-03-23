#!/bin/bash

# Ensure /sbin and /usr/sbin are in the PATH so that the 'ip' command can be found.
export PATH=$PATH:/sbin:/usr/sbin

# If the .env file doesn't exist, create it.
if [ ! -f .env ]; then
    echo "Creating Default .env file"

    # Attempt to determine the default network interface.
    DEFAULT_IF=$(ip route | grep '^default' | awk '{print $5}')
    if [ -z "$DEFAULT_IF" ]; then
      echo "Could not determine default network interface. Using fallback LOCAL_NETWORK=192.168.1.0/24"
      LOCAL_NETWORK="192.168.1.0/24"
    else
      # Extract the IP with CIDR from the default interface, e.g., "192.168.0.190/24".
      LOCAL_NETWORK=$(ip -o -f inet addr show "$DEFAULT_IF" | awk '{print $4}')
      if [ -z "$LOCAL_NETWORK" ]; then
        echo "Could not determine local network range. Using fallback LOCAL_NETWORK=192.168.1.0/24"
        LOCAL_NETWORK="192.168.1.0/24"
      fi
    fi

    # Convert the returned value (e.g., "192.168.0.190/24") to the network base ("192.168.0.0/24")
    # We assume a /24 subnet for this example.
    NETWORK_IP=${LOCAL_NETWORK%/*}   # Extract the IP part (e.g., "192.168.0.190")
    MASK=${LOCAL_NETWORK#*/}         # Extract the mask (e.g., "24")
    if [ "$MASK" -eq 24 ]; then
      # Replace the last octet with 0
      OCTETS=$(echo "$NETWORK_IP" | cut -d '.' -f 1-3)
      LOCAL_NETWORK_BASE="${OCTETS}.0/24"
    else
      # For other masks, you might need a more complex calculation.
      # Here, we simply fall back to the original value.
      LOCAL_NETWORK_BASE=$LOCAL_NETWORK
    fi

    # Check if the container is running in host network mode.
    # If USE_HOST_NETWORK is set to "true", adjust DB_HOST to use "localhost".
    if [ "$USE_HOST_NETWORK" = "true" ]; then
      echo "Host network mode is enabled. Setting DB_HOST to localhost"
      DB_HOST_VALUE="localhost"
    else
      DB_HOST_VALUE="database"
    fi

    # Generate the .env file with the default values, the detected LOCAL_NETWORK_BASE, and adjusted DB_HOST.
    cat <<EOF > .env
NODE_ENV=development
DB_HOST=$DB_HOST_VALUE
DB_USER=root
DB_PASSWORD=password
DB_NAME=pisage
PORT=3000
LOCAL_NETWORK=$LOCAL_NETWORK_BASE
EOF

    echo ".env file generated with LOCAL_NETWORK=$LOCAL_NETWORK_BASE and DB_HOST=$DB_HOST_VALUE"
fi

# Execute the passed command(s)
exec "$@"
