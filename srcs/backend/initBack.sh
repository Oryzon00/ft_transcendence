npm install

#set up database a parti du shema prisma

npx prisma migrate dev --name init
# migrate vs db push ?

npx prisma generate

#Start nest
npm run start:dev &
npx prisma studio

# pour avoir prisma studio en localhost:5555
#	docker exec -it api bash --> npx prisma studio 
