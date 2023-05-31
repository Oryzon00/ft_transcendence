rm -rf dist/ nodes_modules/ src/prisma/migrations/

npm install

# migrate vs db push ?
npx prisma migrate dev --name init

# npx prisma generate

#Start nest
npm run start:dev &
npx prisma studio
