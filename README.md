# CineApp

Application mobile développée avec React Native, Expo et TypeScript permettant de consulter un catalogue de films et séries, de rechercher des titres, de gérer ses favoris et de soumettre des recommandations.

**Auteur** : Matteo Balluais

---

## Fonctionnalités réalisées

- Écran d'accueil avec nom de l'application, présentation et statistiques (nombre de titres, films, séries, genres)
- Catalogue complet affiché avec FlatList et composant MovieCard réutilisable
- Recherche par titre, genre, réalisateur ou tag
- Filtres par type (Tous / Films / Séries) et par genre
- Affichage du nombre de résultats et message si aucun résultat trouvé
- Écran détail avec toutes les informations, résumé, tags, bouton retour et gestion des favoris
- Système de favoris partagé entre tous les écrans via Context API
- Écran "Mes Favoris" avec compteur et message si aucun favori
- Formulaire de recommandation avec validation (titre, type, genre, année obligatoires ; note entre 0 et 5 ; commentaire minimum 20 caractères)
- Message d'erreur si formulaire invalide, message de confirmation si valide
- 5 composants réutilisables typés TypeScript : MovieCard, FilterButton, Badge, EmptyState, AppButton

## Bonus réalisés

- Compteur de favoris avec badge sur l'onglet de navigation

---

## Installation et lancement

### Prérequis

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/MatteoBalluais/CineApp.git
cd CineApp
npm install --legacy-peer-deps
```

### Lancement

```bash
npx expo start --web
```

Puis ouvrir [http://localhost:8081](http://localhost:8081) dans le navigateur.

---

## Difficultés rencontrées

- **Conflit de versions React** : react (19.2.0) et react-dom (19.2.6) avaient des versions différentes, résolu en forçant `react-dom@19.2.0` avec `--legacy-peer-deps`
- **Limite de file watchers sur Linux** : erreur ENOSPC résolue en augmentant `inotify.max_user_watches` via sysctl
- **Partage d'état des favoris** : les favoris n'étaient pas partagés entre les écrans car chaque composant créait sa propre instance du hook. Résolu en mettant en place un Context API global (`FavoritesContext`)
- **Apostrophes dans les strings TypeScript** : les apostrophes typographiques dans les résumés causaient des erreurs de parsing, résolues en utilisant des template literals
- **Filtres ScrollView sur web** : le composant ScrollView horizontal causait des problèmes d'affichage sur React Native Web, remplacé par une View avec flexWrap