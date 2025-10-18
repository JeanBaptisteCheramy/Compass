# Design Document - Compass

## Overview

Compass est une application web de gestion de notes de développement construite avec une architecture moderne découplée. Le frontend Astro génère un site statique optimisé pour les performances et le SEO, tandis que PocketBase fournit une API REST complète avec interface d'administration intégrée.

L'architecture privilégie la simplicité de déploiement et la performance, avec un frontend statique qui peut être hébergé gratuitement et un backend léger facilement déployable.

## Architecture

### Architecture Générale

```
┌──────────────────┐    ┌─────────────────┐
│   Frontend       │    │    Backend      │
│   (Astro)        │◄──►│  (PocketBase)   │
│                  │    │                 │
│ - Pages statiques│    │ - API REST      │
│ - Îlots React    │    │ - Admin UI      │
│ - Recherche      │    │ - File Storage  │
└──────────────────┘    └─────────────────┘
```

### Stack Technique

**Frontend (Astro)**

- Framework: Astro 4.x avec rendu statique
- Styling: Tailwind CSS pour un design responsive
- Interactivité: Îlots React pour les fonctionnalités dynamiques
- Markdown: Support natif avec syntax highlighting (Prism.js)
- Recherche: Fuse.js pour la recherche côté client

**Backend (PocketBase)**

- Base de données: SQLite intégrée
- API: REST automatique avec authentification
- Admin: Interface web intégrée
- Stockage: Gestion native des fichiers/images
- Déploiement: Binaire unique, facile à déployer

### Déploiement

**Frontend**

- Vercel ou Netlify (gratuit)
- Build statique avec génération des pages
- CDN global automatique

**Backend**

- Railway, Render, ou PocketBase Cloud
- Variables d'environnement pour la configuration
- Stockage persistant pour la base de données

## Components and Interfaces

### Modèle de Données PocketBase

**Collection: themes**

```javascript
{
  id: "string",
  name: "string",
  description: "text",
  image: "file",
  created: "datetime",
  updated: "datetime"
}
```

**Collection: sections**

```javascript
{
  id: "string",
  name: "string",
  description: "text",
  image: "file",
  theme: "relation(themes)",
  created: "datetime",
  updated: "datetime"
}
```

**Collection: articles**

```javascript
{
  id: "string",
  title: "string",
  content: "text", // Markdown
  image: "file",
  section: "relation(sections)",
  created: "datetime",
  updated: "datetime"
}
```

### Composants Frontend Astro

**Layouts**

- `BaseLayout.astro`: Layout principal avec navigation
- `AdminLayout.astro`: Layout pour les pages d'administration

**Pages**

- `index.astro`: Page d'accueil avec liste des thèmes
- `theme/[id].astro`: Page d'un thème avec ses sections
- `section/[id].astro`: Page d'une section avec ses articles
- `article/[id].astro`: Page d'affichage d'un article
- `search.astro`: Page de résultats de recherche
- `admin/`: Pages d'administration (îlots React)

**Composants**

- `ThemeCard.astro`: Carte d'affichage d'un thème
- `SectionCard.astro`: Carte d'affichage d'une section
- `ArticleCard.astro`: Carte d'affichage d'un article
- `SearchBox.tsx`: Composant React de recherche
- `AdminForms.tsx`: Formulaires d'administration React

### API Integration

**Service PocketBase**

```typescript
// lib/pocketbase.ts
import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL);

export interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
  expand?: {
    sections: Section[];
  };
}

export interface Section {
  id: string;
  name: string;
  description: string;
  image: string;
  theme: string;
  expand?: {
    articles: Article[];
  };
}

export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  section: string;
}
```

**Fonctions utilitaires**

```typescript
// lib/api.ts
export async function getThemes(): Promise<Theme[]>;
export async function getTheme(id: string): Promise<Theme>;
export async function getSections(themeId: string): Promise<Section[]>;
export async function getSection(id: string): Promise<Section>;
export async function getArticles(sectionId: string): Promise<Article[]>;
export async function getArticle(id: string): Promise<Article>;
export async function searchArticles(query: string): Promise<Article[]>;
```

## Data Models

### Relations

```
Theme (1) ──── (N) Section (1) ──── (N) Article
```

### Règles de Validation

**Themes**

- name: requis, 3-100 caractères
- description: optionnel, max 500 caractères
- image: optionnel, formats: jpg, png, webp, max 2MB

**Sections**

- name: requis, 3-100 caractères
- description: optionnel, max 500 caractères
- theme: requis, référence valide
- image: optionnel, formats: jpg, png, webp, max 2MB

**Articles**

- title: requis, 3-200 caractères
- content: requis, markdown valide
- section: requis, référence valide
- image: optionnel, formats: jpg, png, webp, max 5MB

### Indexation et Performance

**PocketBase**

- Index sur theme.name pour tri alphabétique
- Index sur section.theme pour requêtes par thème
- Index sur article.section pour requêtes par section
- Index full-text sur article.title et article.content pour recherche

**Astro**

- Génération statique des pages principales
- Lazy loading des images avec optimisation automatique
- Préchargement des données critiques au build

## Error Handling

### Gestion d'Erreurs Frontend

**Erreurs de Réseau**

```typescript
// Retry automatique avec backoff exponentiel
// Fallback vers données en cache si disponibles
// Messages d'erreur utilisateur friendly
```

**Erreurs de Validation**

```typescript
// Validation côté client avant envoi
// Affichage des erreurs par champ
// Prévention de soumission multiple
```

**Erreurs 404**

```astro
<!-- 404.astro -->
<!-- Page d'erreur personnalisée avec navigation -->
```

### Gestion d'Erreurs Backend

**PocketBase Rules**

- Validation automatique des schémas
- Gestion des contraintes de relations
- Logs d'erreurs intégrés
- Sauvegarde automatique de la base

**Authentification**

- Session timeout configuré
- Protection CSRF intégrée
- Rate limiting sur les endpoints sensibles

## Testing Strategy

### Tests Frontend

**Tests Unitaires (Vitest)**

- Fonctions utilitaires API
- Composants React isolés
- Validation des données

**Tests d'Intégration**

- Navigation entre pages
- Formulaires d'administration
- Recherche et filtrage

**Tests E2E (Playwright)**

- Parcours utilisateur complet
- Création/modification de contenu
- Responsive design

### Tests Backend

**Tests API**

- Endpoints CRUD pour chaque collection
- Validation des relations
- Gestion des permissions

**Tests de Performance**

- Temps de réponse API
- Optimisation des requêtes
- Gestion de la charge

### Stratégie de Déploiement

**Environnements**

- Development: Local avec PocketBase en mode dev
- Staging: Déploiement automatique sur push
- Production: Déploiement manuel avec validation

**CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
- Build Astro static site
- Run tests
- Deploy to Vercel/Netlify
- Health check
```

**Monitoring**

- Uptime monitoring (UptimeRobot)
- Error tracking (Sentry optionnel)
- Analytics (Google Analytics optionnel)
