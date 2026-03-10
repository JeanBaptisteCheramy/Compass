---
title: "Introduction"
section: "Introduction"
---
## Qu'est-ce que Docker ?

Docker est une plateforme de **conteneurisation** qui permet d'empaqueter une application et toutes ses dépendances dans une unité isolée appelée **conteneur**.

Un conteneur est léger, portable et s'exécute de la même façon quel que soit l'environnement (dev, staging, production).

---

## Différence image / conteneur

| Concept | Description |
|---|---|
| **Image** | Modèle en lecture seule (comme une classe en POO) |
| **Conteneur** | Instance en cours d'exécution d'une image (comme un objet) |

---

## Docker vs machine virtuelle

| | Docker | VM |
|---|---|---|
| Isolation | Processus | Système d'exploitation complet |
| Poids | Quelques Mo | Plusieurs Go |
| Démarrage | Secondes | Minutes |
| Partage noyau | Oui (noyau hôte) | Non |

---

## Les composants principaux

- **Docker Engine** : le daemon qui gère les conteneurs
- **Docker CLI** : l'outil en ligne de commande (`docker`)
- **Docker Hub** : registre public d'images
- **Docker Compose** : outil pour orchestrer plusieurs conteneurs

---

## Docker Hub

[hub.docker.com](https://hub.docker.com) est le registre officiel. On y trouve des images officielles pour nginx, postgres, node, python, etc.

```bash
# Chercher une image
docker search nginx

# Télécharger une image
docker pull nginx
```