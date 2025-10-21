import {
  Collections,
  pb,
  type Article,
  type Section,
  type Theme,
} from "./pocketbase";

// Fonction utilitaire pour gérer les erreurs d'API
async function handleApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}

// Fonctions API pour les Thèmes
export const themeApi = {
  // Récupère tous les thèmes (pour la page d'accueil)
  async getAll(): Promise<Theme[]> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.THEMES).getFullList<Theme>({
        sort: "name", // Trie par nom alphabétique
      });
    });
  },

  // Récupère un thème par son ID avec ses sections
  async getById(id: string): Promise<Theme> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.THEMES).getOne<Theme>(id, {
        expand: "sections(theme)", // Récupère aussi les sections de ce thème
      });
    });
  },

  // Crée un nouveau thème (admin seulement)
  async create(
    data: Omit<Theme, "id" | "created" | "updated">
  ): Promise<Theme> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.THEMES).create<Theme>(data);
    });
  },

  // Met à jour un thème (admin seulement)
  async update(
    id: string,
    data: Partial<Omit<Theme, "id" | "created" | "updated">>
  ): Promise<Theme> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.THEMES).update<Theme>(id, data);
    });
  },

  // Supprime un thème (admin seulement)
  async delete(id: string): Promise<boolean> {
    return handleApiCall(async () => {
      await pb.collection(Collections.THEMES).delete(id);
      return true;
    });
  },
};

// Fonctions API pour les Sections
export const sectionApi = {
  // Récupère toutes les sections d'un thème
  async getByTheme(themeId: string): Promise<Section[]> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.SECTIONS).getFullList<Section>({
        filter: `theme = "${themeId}"`, // Filtre par thème
        sort: "name",
      });
    });
  },

  // Récupère une section par son ID avec ses articles
  async getById(id: string): Promise<Section> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.SECTIONS).getOne<Section>(id, {
        expand: "articles(section),theme", // Récupère les articles et le thème parent
      });
    });
  },

  // Crée une nouvelle section (admin seulement)
  async create(
    data: Omit<Section, "id" | "created" | "updated">
  ): Promise<Section> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.SECTIONS).create<Section>(data);
    });
  },

  // Met à jour une section (admin seulement)
  async update(
    id: string,
    data: Partial<Omit<Section, "id" | "created" | "updated">>
  ): Promise<Section> {
    return handleApiCall(async () => {
      return await pb
        .collection(Collections.SECTIONS)
        .update<Section>(id, data);
    });
  },

  // Supprime une section (admin seulement)
  async delete(id: string): Promise<boolean> {
    return handleApiCall(async () => {
      await pb.collection(Collections.SECTIONS).delete(id);
      return true;
    });
  },
};

// Fonctions API pour les Articles
export const articleApi = {
  // Récupère tous les articles d'une section
  async getBySection(sectionId: string): Promise<Article[]> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.ARTICLES).getFullList<Article>({
        filter: `section = "${sectionId}"`, // Filtre par section
        sort: "-created", // Trie par date de création (plus récent en premier)
      });
    });
  },

  // Récupère un article par son ID
  async getById(id: string): Promise<Article> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.ARTICLES).getOne<Article>(id, {
        expand: "section,section.theme", // Récupère la section et le thème
      });
    });
  },

  // Retourne tous les articles
  async getAll(): Promise<Article[]> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.ARTICLES).getFullList<Article>({
        sort: "title",
      });
    });
  },


  // Recherche dans les articles (titre et contenu)
  async search(query: string): Promise<Article[]> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.ARTICLES).getFullList<Article>({
        filter: `title ~ "${query}" || content ~ "${query}"`, // Recherche dans titre ET contenu
        sort: "-created",
        expand: "section,section.theme",
      });
    });
  },

  // Crée un nouvel article (admin seulement)
  async create(
    data: Omit<Article, "id" | "created" | "updated">
  ): Promise<Article> {
    return handleApiCall(async () => {
      return await pb.collection(Collections.ARTICLES).create<Article>(data);
    });
  },

  // Met à jour un article (admin seulement)
  async update(
    id: string,
    data: Partial<Omit<Article, "id" | "created" | "updated">>
  ): Promise<Article> {
    return handleApiCall(async () => {
      return await pb
        .collection(Collections.ARTICLES)
        .update<Article>(id, data);
    });
  },

  // Supprime un article (admin seulement)
  async delete(id: string): Promise<boolean> {
    return handleApiCall(async () => {
      await pb.collection(Collections.ARTICLES).delete(id);
      return true;
    });
  },
};
