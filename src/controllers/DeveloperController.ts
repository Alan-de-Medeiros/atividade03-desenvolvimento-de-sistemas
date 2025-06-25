import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { developerService } from "../Services/DeveloperService";

export async function DeveloperController(app: FastifyInstance) {
  app.post("/dev",async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as CreateDevType; //CreateDevType é da pasta "developer.d.ts"

    await developerService.create(body)

    return reply.code(201).send();
  });

  app.get(
    "/dev",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const developers = await developerService.getAll();

      return reply.code(200).send(developers);
    }
  );

  app.get(
    "/dev/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };

      const developer = await developerService.getById(params.id);

      return reply.code(200).send(developer);
    }
  );

  app.delete(
    "/dev/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };

      await developerService.deleteById(params.id);

      return reply.code(204).send();
    }
  );
}
