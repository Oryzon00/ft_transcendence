//init DB
npx prisma init --datasource-provider postgres 
npx prisma migrate dev --name init
