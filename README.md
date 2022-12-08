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