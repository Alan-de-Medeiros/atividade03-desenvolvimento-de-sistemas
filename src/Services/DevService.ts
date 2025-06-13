import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

class DevService {
  public async register(devData: Prisma.DeveloperUncheckedCreateInput) {
    try {
      const dev = await prisma.developer.create({
        data: devData,
      });
      return dev;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar desenvolvedor!");
    }
  }

  public async getAll() {
    try {
      return await prisma.developer.findMany();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao listar desenvolvedores!");
    }
  }

  public async getById(id: string) {
    try {
      return await prisma.developer.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar desenvolvedor!");
    }
  }

  public async updateTechs(id: string, techs: string[]) {
    try {
      return await prisma.developer.update({
        where: { id },
        data: { techs },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar tecnologias!");
    }
  }

  public async deleteById(id: string) {
    try {
      return await prisma.developer.delete({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao excluir desenvolvedor!");
    }
  }
}

export const devService = new DevService();
