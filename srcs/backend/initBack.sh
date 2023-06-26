rm -rf dist/ nodes_modules/
npm install

npx prisma format
# npx prisma db push --accept-data-loss
# npx prisma migrate dev --name init
npx prisma generate

#Start nest
npm run start:dev & npx prisma studio
