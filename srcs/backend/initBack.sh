npm install --save @nestjs/platform-socket.io @nestjs/websockets
npm install

#set up database a parti du shema prisma
npx prisma migrate dev --name init

#Start nest
npm run start:dev 

# pour avoir prisma studio en localhost:5555
#	docker exec -it api bash --> npx prisma studio 
