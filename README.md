# TechTools

TechTools est une application web d'outils de service informatique développée dans le cadre d'un projet d'apprentissage de React et Django.

## Fonctionnalités principales

L'application propose deux outils principaux :

1. **Teamviewer** : Outil de connexion à distance pour l'assistance technique.
2. **Ticket** : Tableau de bord de ticketing pour la gestion des demandes de support.
3. **Soon**

## Technologies utilisées

- **Frontend** : React
- **Backend** : Django avec Django Rest Framework
- **Base de données** : PostgreSQL
- **Documentation API** : Swagger UI

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Python (version recommandée : 3.8+)
- Node JS
- PostgreSQL

## Installation et déploiement

### Backend

1. Naviguez vers le dossier du backend :

   ```bash
   cd "Services Informatique"
   ```

2. Créez un environnement virtuel Python :

   ```bash
   python -m venv .venv
   ```

3. Activez l'environnement virtuel :

   - Windows :
     ```bash
     .venv\Scripts\activate
     ```
   - macOS/Linux :
     ```bash
     source .venv/bin/activate
     ```

4. Installez les dépendances :

   ```bash
   cd backend
   pip install -r requirements.txt

   ```
5. crée le fichier .env :

   ```bash
   touch .env
   ```
   
   ```bash
   DB_NAME=EXAMPLE
   USER=EXAMPLE
   PASSWORD=EXAMPLE
   HOST=EXAMPLE
   PORT=EXAMPLE
   ```


6. Lancez le serveur Django :
   ```bash
   cd Ceciaa
   python manage.py runserver
   ```

### Frontend

1. Depuis le dossier racine du projet, naviguez vers le dossier frontend :

   ```bash
   cd frontend/Tech
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez l'application React :
   ```bash
   npm run dev
   ```

L'application sera accessible à l'adresse `http://localhost:5173` (ou sur un autre port si le 5173 est déjà utilisé).

## Documentation API

La documentation de l'API est générée automatiquement avec Swagger UI. Pour y accéder, lancez le serveur backend et visitez :

```
http://localhost:8000/api/docs/
```
