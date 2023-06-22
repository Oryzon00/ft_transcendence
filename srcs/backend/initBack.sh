rm -fr dist/ nodes_modules/
npm install

# migrate vs db push ?
echo migrations
npx prisma migrate dev --name init

# npx prisma generate

#Start nest
npm run start:dev & (
sleep 5 &&
npx prisma studio)
