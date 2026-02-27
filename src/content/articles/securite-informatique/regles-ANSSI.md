---
title: "Règles de l'ANSSI"
section: "ANSSI"
---

## Rappel de définition

Le guide de l'ANSSI vise à aider les développeurs web à concevoir et à mettre en œuvre des sites web sécurisés en se concentrant sur les aspects de sécurité côté navigateur.

Ce guide peut couvrir un large éventail de sujets, tels que :

1. **Gestion des vulnérabilités** : prévenir les attaques courantes (SQL Injection, XSS) en validant et assainissant les entrées utilisateur, en utilisant des requêtes paramétrées et en échappant les données affichées.
2. **Cookies et sessions** : protéger les sessions avec des tokens anti-CSRF (Cross-site request forgery), sécuriser les cookies et régénérer les identifiants de session après authentification pour éviter l’usurpation. Par exemple, un site peut inclure un jeton CSRF unique dans chaque formulaire ou demande de modification. (Cf Symfony)
3. **Communications sécurisées** : utiliser HTTPS avec des certificats SSL/TLS afin de chiffrer les données échangées entre le client et le serveur.
4. **Sécurité côté client** : contrôler et valider les données utilisateur et limiter l’exécution de scripts malveillants (faille XSS, exemple: injection de script javascript via input) grâce à des politiques de sécurité comme la CSP (Content Security Policy).
5. **Politiques de sécurité du contenu (CSP)** : restreindre les sources autorisées pour les scripts et ressources afin d’empêcher l’exécution de contenu non fiable.
6. **Contrôle d’accès et autorisations** : appliquer des rôles et permissions (RBAC - Role-Based Access Control) pour garantir que chaque utilisateur accède uniquement aux ressources autorisées (Role admin, user, etc…).
7. **Téléchargements de fichiers** : vérifier extensions, types et contenu des fichiers et les stocker dans des emplacements sécurisés pour éviter l’exécution de code malveillant.
8. **Plugins et extensions** : utiliser uniquement des plugins fiables, éviter ceux non vérifiés et maintenir navigateurs et extensions à jour.
9. **Mises à jour et correctifs** : effectuer une maintenance régulière des systèmes, frameworks et bibliothèques pour corriger les vulnérabilités connues.

### Règles de sécurité recommandées par l’ANSSI :

- R1 : L’architecture matérielle et logicielle doit respecter le principe de défense en profondeur.
- R2 : Les composants applicatifs doivent être limités au strict nécessaire.
- R3 : Les composants applicatifs doivent être recensés et maintenus à jour.
- R4 : L’administration du site doit utiliser des protocoles sécurisés.
- R5 : L’accès à l’administration doit être limité aux postes autorisés.
- R6 : Les administrateurs doivent être authentifiés de manière sûre.
- R7 : Le principe de moindre privilège doit être appliqué à tout le système.
- R8 : Les fichiers servis aux clients doivent être limités au nécessaire.
- R9 : Les droits sur la base de données doivent appliquer le moindre privilège.
- R10 : Limiter les informations techniques divulguées sur le site.
- R11 : Définir une matrice des flux et appliquer un filtrage réseau.
- R12 : Effectuer les traitements côté serveur et ne pas faire confiance aux entrées client.
- R13 : Utiliser des requêtes préparées ou une couche d’abstraction pour la base de données.
- R14 : Échapper et valider les données externes avant envoi au client.
- R15 : Privilégier les redirections statiques.
- R16 : Pour les redirections dynamiques, utiliser une liste blanche d’URL.
- R17 : Éviter l’inclusion de fichiers dépendant de données externes.
- R18 : Utiliser des listes blanches ou un contrôle strict des données externes.
- R19 : Utiliser des identifiants de session aléatoires (≥ 128 bits d’entropie).
- R20 : Utiliser HTTPS dès qu’une session possède des privilèges particuliers.
- R21 : Associer les attributs HTTPOnly et Secure aux identifiants de session.
- R22 : Ne pas stocker les mots de passe en clair (hachage cryptographique).
- R23 : Utiliser un sel aléatoire pour les mots de passe.
- R24 : Vérifier la légitimité des requêtes pour les actions sensibles.
- R25 : Limiter les contenus tiers et vérifier leur fiabilité.
- R26 : Privilégier une approche statique lorsque possible.
- R27 : Fournir un point de contact facilement identifiable.
- R28 : Analyser régulièrement le site pour détecter des anomalies.
- R29 : Mettre en place une politique de journalisation (conservation et analyse des logs).
