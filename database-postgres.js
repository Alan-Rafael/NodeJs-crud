import { randomUUID } from "node:crypto"
import { sql } from './db.js';

export class DatabaseMemory{


    async list(search){
        let videos;
        if(search){
            videos = await sql`SELECT * FROM videos WHERE title ilike ${'%' + search + '%'}`
        }else{
            videos =  await sql`SELECT * FROM videos`
        }
        console.log(search+" NO DB")
        return videos;
    }

    async create(videos){

        const videoId = randomUUID();
        const {title, description, duration }= videos

        await sql`insert into videos (
        id, title, description, duration
        )VALUES(
            ${videoId}, ${title}, ${description}, ${duration}
        )`;
    }

    async update(id, video){
        const {title, description, duration} = video;

        await sql `update videos set title = ${title}, 
            description = ${description}, 
            duration = ${duration} WHERE id = ${id}`;
    }
    
    async delete(id){
        await sql `delete from videos WHERE id = ${id}`;
    }
}
