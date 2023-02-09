# Ybook DB Schema

La base de données utilise PostgreSQL, les schémas sont définis à l'aide de [Prisma](https://www.prisma.io), ils sont "type-safe" et permettent d'utiliser un client Prisma généré

## Installation

- Copier le dossier prisma dans votre projet
- Installer les dépendances nécessaires à Prisma `npm install typescript ts-node @types/node --save-dev`
- Installer Prisma : `npm install prisma --save-dev`
- ajouter l'URL de connexion fourni par votre responsable à votre fichier `.env` (⚠️ à votre gitignore)
- Générer le client type-safe : `npx prisma generate`

## Attention !

- Il vous est interdit de modifier le schéma prisma
- Vous pouvez utiliser une base de données Postgres locale si besoin

## Launching the backend side 

- The backend runs by default on port 8000 
- base url: http://localhost:8000 

- Before launching the project, you need to intall the packages that the project depends on (npm -i in the console, be careful to be in the "backend" folder before doing so)
- Type npm start to run the server

## Routes

- This section gives a sumary of the different existing routes 

- /users This route handles requests related to users
- /posts This route handles posts written by users
- /likes This route handles the likes that are related to a specific post
- /comments This route handles the comments that are related to a specific post
- /friendships This route handles the friendships sent between users
- /conversation This route handles the conversation beetween two that befriended each other 
- /messages This route handles the messages that two users sent to each othe


