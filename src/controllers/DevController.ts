import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { devService } from '../Services/DevService';

type DevBody = {
  name: string;
  email: string;
  bio: string;
  github_url: string;
  avatar_url: string;
  techs?: string[];
};

type UpdateTechsBody = { techs: string[] };

export async function DevController(app: FastifyInstance) {
  app.post('/devs', async (request: FastifyRequest<{ Body: DevBody }>, reply: FastifyReply) => {
    try {
      const dev = await devService.register(request.body);
      return reply.code(201).send(dev);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  app.get('/devs', async (_request, reply) => {
    try {
      const devs = await devService.getAll();
      return reply.send(devs);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  app.get('/devs/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const devId = request.params.id;
    if (!devId) {
      return reply.code(400).send({ error: 'ID do desenvolvedor inválido' });
    }
    try {
      const dev = await devService.getById(devId);
      if (!dev) {
        return reply.code(404).send({ error: 'Desenvolvedor não encontrado' });
      }
      return reply.send(dev);
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });

  app.patch('/devs/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateTechsBody }>, reply) => {
    const devId = request.params.id;
    if (!devId) {
      return reply.code(400).send({ error: 'ID do desenvolvedor inválido' });
    }
    try {
      const updatedDev = await devService.updateTechs(devId, request.body.techs);
      return reply.send(updatedDev);
    } catch (error: any) {
      return reply.code(400).send({ error: error.message });
    }
  });

  app.delete('/devs/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const devId = request.params.id;
    if (!devId) {
      return reply.code(400).send({ error: 'ID do desenvolvedor inválido' });
    }
    try {
      await devService.deleteById(devId);
      return reply.code(204).send();
    } catch (error: any) {
      return reply.code(500).send({ error: error.message });
    }
  });
}
