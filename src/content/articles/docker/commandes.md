---
title: "Commandes"
section: "Commandes"
---
## Images

```bash
# Lister les images locales
docker images

# Télécharger une image
docker pull mysql:8.0

# Supprimer une image
docker rmi mysql

# Supprimer toutes les images non utilisées
docker image prune -a
```

---

## Conteneurs

```bash
# Lancer un conteneur
docker run mysql:8.0

# Lancer en arrière-plan (detached)
docker run -d mysql:8.0

# Lancer avec un nom
docker run -d --name ma-bdd mysql:8.0

# Lancer avec un port exposé
docker run -d -p 3306:3306 --name ma-bdd mysql:8.0

# Lancer avec des variables d'environnement (obligatoires pour MySQL)
docker run -d --name ma-bdd \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=monapp \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  -p 3306:3306 \
  mysql:8.0
```

---

## Gestion des conteneurs

```bash
# Lister les conteneurs actifs
docker ps

# Lister tous les conteneurs (y compris arrêtés)
docker ps -a

# Arrêter un conteneur
docker stop ma-bdd

# Démarrer un conteneur arrêté
docker start ma-bdd

# Redémarrer
docker restart ma-bdd

# Supprimer un conteneur (doit être arrêté)
docker rm ma-bdd

# Forcer la suppression
docker rm -f ma-bdd

# Supprimer tous les conteneurs arrêtés
docker container prune
```

---

## Interagir avec un conteneur

```bash
# Exécuter une commande dans un conteneur actif
docker exec ma-bdd mysql -u root -psecret -e "SHOW DATABASES;"

# Ouvrir un shell interactif
docker exec -it ma-bdd bash

# Ouvrir directement le client MySQL
docker exec -it ma-bdd mysql -u root -psecret

# Voir les logs
docker logs ma-bdd

# Suivre les logs en temps réel
docker logs -f ma-bdd

# Voir les stats (CPU, mémoire)
docker stats
```

---

## Informations

```bash
# Inspecter un conteneur (JSON détaillé)
docker inspect ma-bdd

# Voir les ports exposés
docker port ma-bdd

# Historique d'une image
docker history mysql:8.0
```

---

## Nettoyage global

```bash
# Supprimer tout ce qui n'est pas utilisé (conteneurs, images, réseaux, volumes)
docker system prune -a
```
