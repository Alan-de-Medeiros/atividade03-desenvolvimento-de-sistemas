import { randomUUID } from "crypto";
import { prisma } from "../prisma/client";
import { Developer } from "@prisma/client";

class DeveloperService {
    public async create(dev: CreateDevType) {
        const devExist = await prisma.developer.findUnique({ where: { username: dev.username}});
        if(devExist !== null){
            throw new Error("Já existe um DEV com esse username")
        }

    const developer = {
        id: randomUUID(),
        name: dev.name,
        username: dev.username,
        techs: dev.techs,
        github_url: dev.github_url,
        avatar_url: dev.avatar_url,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date() 
    } as Developer;

     await prisma.developer.create({ data: developer })
    }

    public async getAll() {
        return await prisma.developer.findMany({
            where: { is_active: true },
            orderBy: { name: 'asc' }
        });
    }

    public async getById(id : string) {
        return await prisma.developer.findUnique({
            where: { id: id }
        })
    }

    public async deleteById(id: string) {
        const updateDev = {
            is_active: false,
            updated_at: new Date()
        }

        await prisma.developer.update({
            where: { id: id },
            data: updateDev
        })
    }
}

export const developerService = new DeveloperService();