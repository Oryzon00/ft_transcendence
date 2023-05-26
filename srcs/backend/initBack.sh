rm -rf dist/ migrations/ nodes_modules/

npm install

# # migrate vs db push ?
npx prisma migrate dev --name init
# # npx db push

npx prisma generate

#Start nest
npm run start:dev &
npx prisma studio

