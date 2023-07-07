rm -rf dist/ nodes_modules/
npm install

# npx prisma db push --accept-data-loss
# npx prisma migrate dev --name init
# npx prisma generate
npx prisma db push --force-reset

#Start nest
npm run start:dev & npx prisma studio
