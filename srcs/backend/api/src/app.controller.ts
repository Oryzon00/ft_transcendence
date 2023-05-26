import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "@prisma/client";
import path from "path";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): Promise<string> {
		return this.appService.getHello();
	}

	@Get("users")
	getUsers(): Promise<User[]> {
		return this.appService.getUsers();
	}

	@Get("nbUsers")
	getNbUsers(): Promise<number> {
		return this.appService.getNbUsers();
	}

	@Get("/name/:name")
	getUserByName(@Param("name") name: string) : Promise<User> {
		console.log(`name is : ${name}`);
		return this.appService.getUserByName(name);
	}

	@Get("/id/:id")
	getUserById( @Param("id") id: string) : Promise<User> {
		console.log(`id is: ${id}`);
		return this.appService.getUserById(Number(id));
	}

	
}

@Controller("test2")
export class AppController2 {
	constructor(private readonly appService: AppService) {}

	@Get()
	async getTest2(): Promise<String> {
		return "test2";
	}

	@Get("test3")
	async getTest3(): Promise<String> {
		return "test3";
	}
}
