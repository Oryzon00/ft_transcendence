echo "LANCEMENT DU SCIPT"

npm install
# npx prisma init --datasource-provider postgres

#set up database a parti du shema prisma
npx prisma migrate dev --name init

#Start nest
npm run start:dev 
