# RealtimeChatApp Backend

Petite application de chat en temps réel utilisant React et Node.js. Ceci est le dépôt du **Backend**.

## 🛠 Tech Stack
-   **Core** : Node.js + Express
-   **Base de données** : MongoDB + Mongoose
-   **Modules** : ES Modules (`import`/`export`) uniquement
-   **Authentification** : JWT (Access Token) + Refresh Token (Rotation, HTTP Only Cookies)
-   **Temps réel** : Socket.io
-   **Environnement** : Doppler (Gestion des secrets)
-   **Tests** : Jest + Supertest + MongoDB Memory Server

## 📂 Structure du Projet
```text
src/
├── controller/     # [domaine]-controller.js (Logique de réponse HTTP)
├── services/       # [domaine]-service.js (Logique métier)
├── models/         # [domaine]-model.js (Schémas Mongoose)
├── routes/         # [domaine]-routes.js + index.js (Définition des endpoints)
├── middleware/     # Middlewares personnalisés (Auth, Multer, etc.)
├── utils/          # Fonctions utilitaires helper
└── config/         # Configuration DB et autres

tests/
├── services/       # Tests unitaires des services
└── endpoints/      # Tests d'intégration des API (Supertest)
```

## 🔄 Workflow de Développement
Ce projet utilise **Git Flow**. Chaque nouvelle fonctionnalité doit être développée sur une branche `feature/[nom-de-la-feature]`.

Workflow par feature :
1.  `model` : Création du schéma de données.
2.  `service` : Implémentation de la logique métier.
3.  `controller` : Gestion des requêtes et réponses.
4.  `route` : Définition des chemins API.
5.  **`tests`** : Écriture des tests correspondants (Obligatoire).
6.  **`README`** : Documentation de l'implémentation avec la date du jour.
7.  `Delivery` : Livraison finale.

## 📏 Règles du Projet
-   **Modules** : Toujours utiliser ESM (`import`/`export`). Ne jamais utiliser `require()`.
-   **Extensions** : Toujours inclure l'extension `.js` dans les imports internes.
-   **Noms de fichiers** : Respecter le format `[domaine]-[type].js`.
-   **Variables d'environnement** : Toujours lancer le serveur via Doppler :
    ```bash
    doppler run -- npm run dev
    ```
-   **Tests** : Aucun code n'est considéré comme terminé sans ses tests unitaires/intégration.

---

## 📅 Historique des Implémentations

### [2026-04-09] - [Authentification] Migration ES Modules (ESM)
- Conversion complète du backend vers ES Modules.
- Mise à jour de `package.json` et des extensions de fichiers.

### [2026-04-09] - [Authentification] Suite de Tests
- Configuration de Jest en mode ESM.
- Mise en place de `mongodb-memory-server`.
- Tests unitaires/intégration fonctionnels pour la gestion utilisateur et jetons.

## 🚀 Lancement Rapide
```bash
# Lancement dev (Nécessite Doppler)
doppler run -- npm run dev

# Lancement des tests
npm test
```
