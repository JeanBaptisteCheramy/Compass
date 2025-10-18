# Implementation Plan - Compass

- [x] 1. Setup project structure and PocketBase backend

  - Initialize PocketBase instance with collections schema
  - Configure admin authentication and basic settings
  - Create themes, sections, and articles collections with proper relations
  - Set up file storage configuration for images
  - _Requirements: 2.1, 6.1, 6.2, 6.3_

- [x] 2. Initialize Astro frontend project

  - Create new Astro project with TypeScript support
  - Install and configure Tailwind CSS for styling
  - Set up PocketBase client integration and environment variables
  - Create basic project structure with layouts and components folders
  - _Requirements: 1.1, 1.5_

- [ ] 3. Implement core data models and API integration
- [x] 3.1 Create PocketBase TypeScript interfaces and client setup

  - Define Theme, Section, and Article interfaces matching PocketBase schema
  - Implement PocketBase client configuration with authentication
  - Create API utility functions for CRUD operations
  - _Requirements: 1.4, 2.1, 6.1_

- [x] 3.2 Implement data fetching functions

  - Write functions to fetch themes, sections, and articles from PocketBase
  - Implement search functionality across article content
  - Add error handling and loading states for API calls
  - _Requirements: 1.1, 1.2, 1.3, 5.2, 5.3_

- [ ]\* 3.3 Write unit tests for API functions

  - Create tests for data fetching and transformation functions
  - Mock PocketBase responses for reliable testing
  - Test error handling scenarios
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 4. Create public pages and navigation
- [x] 4.1 Build main layout and navigation components

  - Create BaseLayout with header, navigation, and footer
  - Implement responsive navigation with theme/section hierarchy
  - Add search box component in navigation
  - _Requirements: 1.5, 5.1_

- [x] 4.2 Implement homepage with themes display

  - Create index page showing all themes with images
  - Display theme cards with name, description, and image
  - Implement navigation to theme detail pages
  - _Requirements: 1.1, 6.4_

- [ ] 4.3 Create theme detail pages

  - Build dynamic theme pages showing sections within theme
  - Display section cards with images and descriptions
  - Implement breadcrumb navigation
  - _Requirements: 1.2, 6.4_

- [ ] 4.4 Create section detail pages

  - Build dynamic section pages showing articles within section
  - Display article cards with titles and content previews
  - Maintain hierarchical navigation structure
  - _Requirements: 1.3, 1.5_

- [ ] 4.5 Create article detail pages

  - Build dynamic article pages with full content display
  - Implement markdown rendering with syntax highlighting
  - Display article images and maintain navigation context
  - _Requirements: 3.1, 3.2, 3.4, 3.5_

- [ ] 5. Implement search functionality
- [ ] 5.1 Create search page and results display

  - Build search results page with article previews
  - Implement search result navigation to articles
  - Handle empty search results with appropriate messaging
  - _Requirements: 5.3, 5.4, 5.5_

- [ ] 5.2 Add client-side search with Fuse.js

  - Integrate Fuse.js for fuzzy search capabilities
  - Implement real-time search as user types
  - Search through article titles and content
  - _Requirements: 5.1, 5.2_

- [ ] 6. Build admin authentication and interface
- [ ] 6.1 Implement admin authentication system

  - Create admin login page with PocketBase authentication
  - Set up protected routes for admin functionality
  - Implement session management and logout
  - _Requirements: 2.1, 4.1_

- [ ] 6.2 Create admin dashboard and navigation

  - Build admin layout with management navigation
  - Create dashboard showing content statistics
  - Implement admin-only navigation and controls
  - _Requirements: 2.1, 6.1_

- [ ] 7. Implement content management forms
- [ ] 7.1 Create theme management interface

  - Build forms for creating and editing themes
  - Implement image upload for theme images
  - Add theme deletion with confirmation
  - _Requirements: 6.2, 6.3, 6.5_

- [ ] 7.2 Create section management interface

  - Build forms for creating and editing sections
  - Implement theme selection and image upload
  - Add section deletion with confirmation
  - _Requirements: 6.2, 6.3, 6.5_

- [ ] 7.3 Create article management interface

  - Build forms for creating and editing articles with markdown editor
  - Implement section selection and image upload
  - Add article deletion with confirmation and immediate list updates
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 4.2, 4.3, 4.4, 4.5_

- [ ]\* 7.4 Add markdown preview functionality

  - Implement live preview for markdown content
  - Show syntax highlighting in preview mode
  - _Requirements: 3.1, 3.2_

- [ ] 8. Implement image handling and optimization
- [ ] 8.1 Set up image upload and storage

  - Configure PocketBase file storage for images
  - Implement image validation and size limits
  - Handle image uploads in admin forms
  - _Requirements: 6.2, 6.3, 6.5_

- [ ] 8.2 Add image optimization and display

  - Implement responsive image display with Astro Image
  - Add lazy loading for better performance
  - Create image fallbacks for missing images
  - _Requirements: 1.1, 1.2, 1.3, 6.4_

- [ ] 9. Styling and responsive design
- [ ] 9.1 Implement responsive layout and components

  - Style all components with Tailwind CSS
  - Ensure mobile-first responsive design
  - Create consistent visual hierarchy and spacing
  - _Requirements: 1.1, 1.2, 1.3, 1.5_

- [ ] 9.2 Add syntax highlighting for code blocks

  - Configure Prism.js or Shiki for code highlighting
  - Support multiple programming languages
  - Style code blocks with proper theming
  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [ ] 10. Final integration and deployment setup
- [ ] 10.1 Configure build and deployment

  - Set up Astro build configuration for static generation
  - Configure environment variables for production
  - Prepare deployment scripts for Vercel/Netlify
  - _Requirements: All requirements_

- [ ]\* 10.2 Add error pages and handling

  - Create custom 404 page with navigation
  - Implement error boundaries for React components
  - Add loading states and error messages
  - _Requirements: 1.5, 5.4_

- [ ]\* 10.3 Performance optimization
  - Optimize bundle size and loading performance
  - Implement proper caching strategies
  - Add meta tags for SEO
  - _Requirements: All requirements_
