import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	await app.listen(3000);

	// Requete HTTP dans le front
	//   fetch('http://localhost:3000', {
	// 	method: 'GET'
	//   })
}
bootstrap();
