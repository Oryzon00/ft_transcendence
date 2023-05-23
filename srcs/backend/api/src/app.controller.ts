import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "@prisma/client";
import path from "path";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	
	@Get()
	async getHello(): Promise<User[]> {
		return await this.appService.getHello();
	}
	@Get("test")
	async getTest(): Promise<String> {
		return "test";
	}
}

@Controller("test2")
export class AppController2 {
	constructor(private readonly appService: AppService) {}

	
	// @Get()
	// async getHello(): Promise<User[]> {
	// 	return await this.appService.getHello();
	// }
	@Get()
	async getTest2(): Promise<String> {
		return "test2";
	}
	@Get("test3")
	async getTest3(): Promise<String> {
		return "test3";
	}
}
