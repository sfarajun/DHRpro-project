## 🧰 Initial Setup (First-Time Only)

Make sure setup scripts are executable (if not already):

```bash
docker compose run backend-service flask --app app db init
docker compose run backend-service flask --app app db migrate -m "initial schema"
docker compose run backend-service flask --app app db upgrade


# ------------------------

