import { fastify } from "fastify";
import { DatabaseMemory } from './database-postgres.js';


const server = fastify();
const database = new DatabaseMemory();


server.post("/videos", async (request, reply) => {
    
    const { title, description, duration } = request.body;
    await database.create({
        title,
        description,
        duration,
    });
    return reply.status(201).send();
});

server.get("/videos", async (request, reply) => {

    const search = request.query.search;
    const videos = await database.list(search);
    console.log(search)
    return videos;
});

server.put("/videos/:id", async(request, reply) => {

    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    });
    return reply.status(204).send();
});

server.delete("/videos/:id", async(request, reply) => {

    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send();
});

server.listen({
    port: 3000,
});

