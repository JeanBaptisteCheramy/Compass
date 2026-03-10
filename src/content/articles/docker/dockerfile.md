---
title: "Dockerfile"
section: "Dockerfile"
---
## Qu'est-ce qu'un Dockerfile ?

Un `Dockerfile` est un fichier texte qui décrit les étapes pour construire une image Docker. Chaque instruction crée une **couche** dans l'image.

---

## Instructions principales

### FROM
Définit l'image de base.
```dockerfile
FROM node:20-alpine
```

### WORKDIR
Définit le répertoire de travail dans le conteneur.
```dockerfile
WORKDIR /app
```

### COPY / ADD
Copie des fichiers depuis l'hôte vers le conteneur.
```dockerfile
COPY package.json .
COPY . .
```
`ADD` supporte en plus les URLs et l'extraction d'archives `.tar`.

### RUN
Exécute une commande lors de la construction de l'image.
```dockerfile
RUN npm install
RUN apt-get update && apt-get install -y curl
```

### ENV
Définit des variables d'environnement.
```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

### EXPOSE
Documente le port sur lequel l'application écoute (ne publie pas le port).
```dockerfile
EXPOSE 3000
```

### CMD
Commande par défaut à l'exécution du conteneur (peut être surchargée).
```dockerfile
CMD ["node", "index.js"]
```

### ENTRYPOINT
Point d'entrée fixe du conteneur (non surchargé par défaut).
```dockerfile
ENTRYPOINT ["node"]
CMD ["index.js"]
```

### ARG
Variable disponible uniquement pendant la construction.
```dockerfile
ARG VERSION=1.0
```

---

## Exemple complet — Application Node.js

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/index.js"]
```

---

## Construire et lancer l'image

```bash
# Construire l'image
docker build -t mon-app:1.0 .

# Lancer un conteneur depuis l'image
docker run -d -p 3000:3000 mon-app:1.0
```

---

## .dockerignore

Comme `.gitignore`, ce fichier exclut des fichiers de la construction.

```
node_modules
.git
*.log
.env
dist
```

---

## Multi-stage build

Réduit la taille finale de l'image en séparant les étapes de build et de production.

```dockerfile
# Étape 1 : build
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Étape 2 : image finale légère
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/index.js"]
```