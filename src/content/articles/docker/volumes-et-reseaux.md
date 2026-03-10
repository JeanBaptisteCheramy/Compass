---
title: "Volumes et réseaux"
section: "Volumes et réseaux"
---
## Volumes

Par défaut, les données d'un conteneur sont **perdues** à sa suppression. Les volumes permettent de **persister** les données.

### Types de montage

| Type | Description |
|---|---|
| **Volume Docker** | Géré par Docker, stocké dans `/var/lib/docker/volumes/` |
| **Bind mount** | Dossier de l'hôte monté directement dans le conteneur |
| **tmpfs** | Stockage en mémoire (non persisté) |

---

### Volumes Docker

```bash
# Créer un volume
docker volume create mes-donnees

# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect mes-donnees

# Supprimer un volume
docker volume rm mes-donnees

# Utiliser un volume dans un conteneur
docker run -d -v mes-donnees:/var/lib/postgresql/data postgres
```

---

### Bind mounts

Monte un répertoire de l'hôte dans le conteneur. Idéal pour le développement.

```bash
# Monter le dossier courant dans /app
docker run -d -v $(pwd):/app -p 3000:3000 mon-app
```

Les modifications faites côté hôte sont immédiatement visibles dans le conteneur, et inversement.

---

## Réseaux

Docker isole les conteneurs dans des réseaux virtuels. Les conteneurs d'un même réseau peuvent se joindre par leur **nom**.

### Types de réseaux

| Type | Description |
|---|---|
| **bridge** | Réseau par défaut, isolation entre conteneurs |
| **host** | Partage le réseau de l'hôte |
| **none** | Aucune interface réseau |
| **overlay** | Pour Docker Swarm (multi-hôtes) |

---

### Gérer les réseaux

```bash
# Lister les réseaux
docker network ls

# Créer un réseau
docker network create mon-reseau

# Inspecter un réseau
docker network inspect mon-reseau

# Lancer un conteneur dans un réseau
docker run -d --name api --network mon-reseau mon-api
docker run -d --name db --network mon-reseau postgres

# Connecter un conteneur existant à un réseau
docker network connect mon-reseau mon-conteneur

# Déconnecter
docker network disconnect mon-reseau mon-conteneur
```

---

### Communication entre conteneurs

Dans un réseau personnalisé, les conteneurs se retrouvent par leur **nom de service** :

```bash
# Le conteneur "api" peut joindre "db" simplement via :
# postgresql://db:5432/mabase
```

> Sur le réseau `bridge` par défaut, la résolution par nom ne fonctionne pas — il faut utiliser une adresse IP ou créer un réseau personnalisé.

---

### Publication de ports

```bash
# -p <port_hôte>:<port_conteneur>
docker run -p 8080:80 nginx

# Toutes les interfaces
docker run -p 0.0.0.0:8080:80 nginx

# Interface spécifique (localhost uniquement)
docker run -p 127.0.0.1:8080:80 nginx
```