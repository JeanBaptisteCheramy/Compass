---
title: "Docker Compose"
section: "Docker Compose"
---
## Qu'est-ce que Docker Compose ?

Docker Compose est un outil qui permet de définir et lancer **plusieurs conteneurs** avec un seul fichier `docker-compose.yml`. Idéal pour gérer une stack complète (app + base de données + cache, etc.).

---

## Structure du fichier

```yaml
services:
  nom-du-service:
    image: nginx
    ports:
      - "8080:80"
```

---

## Exemple complet — Stack web classique

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mabase
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mabase
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

---

## Commandes essentielles

```bash
# Lancer tous les services (en arrière-plan)
docker compose up -d

# Lancer en reconstruisant les images
docker compose up -d --build

# Arrêter et supprimer les conteneurs
docker compose down

# Arrêter, supprimer conteneurs ET volumes
docker compose down -v

# Voir les logs de tous les services
docker compose logs -f

# Voir les logs d'un service
docker compose logs -f api

# Lister les conteneurs de la stack
docker compose ps

# Exécuter une commande dans un service
docker compose exec api bash

# Reconstruire une image sans lancer
docker compose build

# Redémarrer un service
docker compose restart api
```

---

## Options clés par service

| Option | Description |
|---|---|
| `image` | Image Docker à utiliser |
| `build` | Chemin vers le Dockerfile à construire |
| `ports` | Publication de ports `hôte:conteneur` |
| `environment` | Variables d'environnement |
| `env_file` | Fichier `.env` à charger |
| `volumes` | Montages de volumes |
| `depends_on` | Ordre de démarrage des services |
| `restart` | Politique de redémarrage (`always`, `unless-stopped`, `no`) |
| `networks` | Réseaux personnalisés |
| `command` | Surcharger la commande par défaut |

---

## Utiliser un fichier .env

Docker Compose charge automatiquement le fichier `.env` à la racine.

```bash
# .env
POSTGRES_PASSWORD=supersecret
PORT=3000
```

```yaml
# docker-compose.yml
services:
  api:
    ports:
      - "${PORT}:3000"
  db:
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

---

## Profils

Les profils permettent de démarrer certains services conditionnellement.

```yaml
services:
  api:
    image: mon-api

  adminer:
    image: adminer
    profiles: ["tools"]
    ports:
      - "8080:8080"
```

```bash
# Lance uniquement api
docker compose up -d

# Lance api + adminer
docker compose --profile tools up -d
```