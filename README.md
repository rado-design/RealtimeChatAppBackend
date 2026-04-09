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

## 📡 API Endpoints

### 🔐 Authentification (`/api/auth`)
- `POST /register` : Créer un nouveau compte.
- `POST /login` : Se connecter et obtenir un Access Token + Refresh Token (cookie).
- `GET /refresh-token` : Rafraîchir l'Access Token.

### 👤 Utilisateurs (`/api/users`)
- `GET /` : Liste des utilisateurs (avec recherche optionnelle).

### 💬 Messagerie (`/api/messages`)
- `GET /conversations` : Liste toutes les conversations de l'utilisateur.
- `GET /:conversationId` : Historique des messages d'une conversation.
- `POST /private` : Démarrer un chat privé avec un autre utilisateur.
- `POST /groups` : Créer un nouveau groupe de discussion (Admin par défaut).
- `POST /groups/:groupId/participants` : Ajouter des membres (ID dans le body).
- `DELETE /groups/:groupId/participants` : Retirer un membre (Admin uniquement).
- `POST /groups/:groupId/leave` : Quitter un groupe.
- `PATCH /groups/:groupId/participants/role` : Changer le rôle d'un membre (Admin uniquement).

---

## 📅 Historique des Implémentations

### [2026-04-09] - [Messaging Advanced] Rôles & Gestion de Groupes
- **Rôles** : Support des rôles `ADMIN` et `MEMBER`.
- **Modèle** : Transition vers une structure `participants.user` pour stocker les métadonnées de membre.
- **Gestion** : Ajout des fonctionnalités de retrait de membre, de démission (quitter) et de changement de rôle.
- **Validation** : 29 tests automatisés couvrant les services et les endpoints.

### [2026-04-09] - [Messaging & WebSockets] Temps Réel & Chat
- Implémentation des modèles `Conversation` et `Message`.
- **WebSockets** : Intégration de `Socket.io` pour la communication temps réel via Rooms.
- Séparation des services en `ConversationService`, `GroupService` et `MessageService`.

## 🚀 Lancement Rapide
```bash
# Lancement dev (Nécessite Doppler)
doppler run -- npm run dev

# Lancement des tests
npm test
```
