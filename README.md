# Ybook

The database uses PostgreSQL, the schemas are defined using [Prisma](https://www.prisma.io), they are "type-safe" and allow to use a generated Prisma client.

## Installing Prisma

- Install Prisma's necessary dependencies `npm install typescript ts-node @types/node --save-dev`
- Install Prisma : `npm install prisma --save-dev`
- Générer le client type-safe : `npx prisma generate`

## Launching the backend side 

- Before launching the project, you need to intall the packages that the project depends on (npm -i in the console, be careful to be in the "backend" folder before doing so)
- Type npm start to run the server

- The backend runs by default on port 8000 
- base url: http://localhost:8000 

## Routes

- This section gives a sumary of the different existing routes 

- /users This route handles requests related to users
- /posts This route handles posts written by users
- /likes This route handles the likes that are related to a specific post
- /comments This route handles the comments that are related to a specific post
- /friendships This route handles the friendships sent between users
- /conversations This route handles the conversation beetween two that befriended each other 
- /messages This route handles the messages that two users sent to each othe


