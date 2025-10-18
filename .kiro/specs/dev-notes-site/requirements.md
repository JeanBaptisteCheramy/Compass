# Requirements Document

## Introduction

Compass est un site web personnel pour organiser et gérer des notes de développement dans le cadre d'une formation. Le système permet de structurer les connaissances en thèmes, sections et articles avec des exemples de code, accessible via une interface web simple et déployable gratuitement.

## Glossary

- **Compass**: Le système web complet pour la gestion des notes de développement
- **Theme**: Catégorie principale d'organisation (ex: JavaScript, CSS, Frameworks)
- **Section**: Sous-catégorie dans un thème (ex: Variables, Fonctions dans JavaScript)
- **Article**: Note individuelle contenant du contenu, des définitions ou des exemples de code
- **Note Form**: Formulaire web pour ajouter de nouveaux articles
- **Admin**: L'utilisateur administrateur unique qui peut créer, modifier et supprimer du contenu
- **Visitor**: Utilisateur en lecture seule qui peut consulter le contenu public
- **Image**: Fichier graphique associé à un thème, section ou article pour illustration

## Requirements

### Requirement 1

**User Story:** En tant que visiteur, je veux consulter les notes organisées par thèmes et sections, afin de parcourir les connaissances de développement disponibles.

#### Acceptance Criteria

1. Compass SHALL display all available themes with their associated images on the main page
2. WHEN a visitor selects a theme, Compass SHALL display all sections within that theme with their images
3. WHEN a visitor selects a section, Compass SHALL display all articles within that section
4. Compass SHALL maintain a hierarchical structure of themes containing sections containing articles
5. Compass SHALL allow public navigation between themes, sections, and articles without authentication

### Requirement 2

**User Story:** En tant qu'admin, je veux ajouter de nouvelles notes via un formulaire, afin de pouvoir enrichir ma base de connaissances facilement.

#### Acceptance Criteria

1. Compass SHALL provide admin authentication to access content management features
2. WHEN authenticated as admin, Compass SHALL provide a note creation form
3. WHEN creating a new article, THE Note Form SHALL require a title, content, theme selection, section selection, and optional image upload
4. WHEN submitting the form, Compass SHALL validate all required fields are completed
5. WHEN form validation passes, Compass SHALL save the new article with its image to the selected theme and section

### Requirement 3

**User Story:** En tant que développeur en formation, je veux inclure des exemples de code dans mes notes, afin de documenter des solutions pratiques avec une syntaxe colorée.

#### Acceptance Criteria

1. Compass SHALL support markdown formatting in article content
2. Compass SHALL render code blocks with syntax highlighting
3. Compass SHALL support multiple programming languages for syntax highlighting
4. WHEN displaying an article, Compass SHALL preserve code formatting and indentation
5. Compass SHALL allow inline code snippets within article text

### Requirement 4

**User Story:** En tant qu'admin, je veux pouvoir modifier et supprimer mes notes existantes, afin de maintenir mes connaissances à jour.

#### Acceptance Criteria

1. WHEN authenticated as admin and viewing an article, Compass SHALL provide edit and delete options
2. WHEN editing an article, Compass SHALL pre-populate the form with existing content and current image
3. WHEN updating an article, Compass SHALL validate the modified content and handle image updates
4. WHEN deleting an article, Compass SHALL request confirmation before permanent removal
5. Compass SHALL update the article list immediately after modifications

### Requirement 5

**User Story:** En tant que visiteur, je veux rechercher dans les notes, afin de retrouver rapidement des informations spécifiques.

#### Acceptance Criteria

1. Compass SHALL provide a search functionality accessible from the main navigation
2. WHEN performing a search, Compass SHALL search through article titles and content
3. Compass SHALL display search results with article title, theme, section, and content preview
4. WHEN no results are found, Compass SHALL display an appropriate message
5. Compass SHALL allow visitors to navigate directly to articles from search results

### Requirement 6

**User Story:** En tant qu'admin, je veux gérer les thèmes et sections avec des images, afin d'organiser visuellement ma base de connaissances.

#### Acceptance Criteria

1. WHEN authenticated as admin, Compass SHALL provide theme and section management interfaces
2. WHEN creating a theme, Compass SHALL require a name, description, and image upload
3. WHEN creating a section, Compass SHALL require a name, description, theme assignment, and image upload
4. Compass SHALL display theme and section images in the public navigation
5. WHEN updating themes or sections, Compass SHALL allow image replacement while preserving existing content
