#!/bin/bash
# Run inside the container to initialize DB migrations (only once per service)

echo "Running DB setup: init, migrate, upgrade..."

# Only run `flask db init` if migrations folder doesn't exist
if [ ! -d "migrations" ]; then
    flask db init
fi

flask db migrate
flask db upgrade

echo "Database setup complete."
