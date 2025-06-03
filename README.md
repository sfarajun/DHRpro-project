## Intro
Hi there!
This is a simple project management app. You can add projects and tasks. 
It runs using separate microservices - a postgres db, a flask backend, and react for the frontend.

Before running follow the instructions below...


## Initial Setup (First-Time Only)

Make sure to run the following to set up the postgres db with an initial schema:

```bash
docker compose run backend-service flask --app app db init
docker compose run backend-service flask --app app db migrate -m "initial schema"
docker compose run backend-service flask --app app db upgrade
docker compose up --build
```

## For Future Runs
```bash
docker compose up
```
# ------------------------

