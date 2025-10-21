import type { Article } from "./pocketbase";

// Ré-exporte les types pour faciliter les imports
export type { Article, BaseRecord, Section, Theme } from "./pocketbase";

// Types pour les formulaires d'administration
export interface ThemeFormData {
  name: string; // Nom du thème
  description: string; // Description
  image?: File; // Fichier image (optionnel)
}

export interface SectionFormData {
  name: string; // Nom de la section
  description: string; // Description
  theme: string; // ID du thème parent
  image?: File; // Fichier image (optionnel)
}

export interface ArticleFormData {
  title: string; // Titre de l'article
  content: string; // Contenu en Markdown brut (pas de HTML)
  section: string; // ID de la section parent
  image?: File; // Fichier image (optionnel)
}

// Type pour les résultats de recherche
export interface SearchResult {
  articles: Article[]; // Liste des articles trouvés
  total: number; // Nombre total de résultats
}

// Type pour la navigation (fil d'Ariane)
export interface Breadcrumb {
  label: string; // Texte à afficher
  href: string; // Lien vers la page
}

// Wrapper pour les réponses d'API
export interface ApiResponse<T> {
  data: T; // Données récupérées
  error?: string; // Message d'erreur éventuel
}

// États de chargement pour l'interface
export interface LoadingState {
  isLoading: boolean; // Est-ce qu'on charge ?
  error?: string; // Message d'erreur éventuel
}
