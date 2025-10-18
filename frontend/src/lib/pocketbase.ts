import PocketBase from "pocketbase";

// Initialise le client PocketBase - c'est la connexion entre ton frontend et ton backend
export const pb = new PocketBase(
  import.meta.env.PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090"
);

// Désactive l'annulation automatique des requêtes dupliquées
pb.autoCancellation(false);

// Types de base pour tous les enregistrements PocketBase
// Chaque enregistrement a un id, une date de création et de modification
export interface BaseRecord {
  id: string;
  created: string;
  updated: string;
}

// Interface pour un Thème (ex: JavaScript, CSS, etc.)
export interface Theme extends BaseRecord {
  name: string; // Nom du thème
  description: string; // Description du thème
  image: string; // Nom du fichier image
  expand?: {
    // Données liées qu'on peut récupérer en même temps
    sections?: Section[];
  };
}

// Interface pour une Section (ex: Variables, Fonctions dans JavaScript)
export interface Section extends BaseRecord {
  name: string; // Nom de la section
  description: string; // Description de la section
  image: string; // Nom du fichier image
  theme: string; // ID du thème parent
  expand?: {
    // Données liées qu'on peut récupérer
    articles?: Article[];
    theme?: Theme;
  };
}

// Interface pour un Article (une note individuelle)
export interface Article extends BaseRecord {
  title: string; // Titre de l'article
  content: string; // Contenu en markdown
  image: string; // Nom du fichier image
  section: string; // ID de la section parent
  expand?: {
    // Données liées qu'on peut récupérer
    section?: Section;
  };
}

// Noms des collections dans PocketBase
export const Collections = {
  THEMES: "themes",
  SECTIONS: "sections",
  ARTICLES: "articles",
} as const;

// Fonction utilitaire pour obtenir l'URL complète d'un fichier
export function getFileUrl(record: BaseRecord, filename: string): string {
  if (!filename) return "";
  return pb.files.getUrl(record, filename);
}

// Fonctions d'authentification pour l'admin
export const auth = {
  // Vérifie si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return pb.authStore.isValid;
  },

  // Récupère l'utilisateur actuel
  getCurrentUser() {
    return pb.authStore.record;
  },

  // Connexion avec email/mot de passe
  async login(email: string, password: string) {
    return await pb.collection("users").authWithPassword(email, password);
  },

  // Déconnexion
  logout() {
    pb.authStore.clear();
  },

  // S'abonner aux changements d'authentification
  onChange(callback: (token: string, record: any) => void) {
    return pb.authStore.onChange(callback);
  },
};
