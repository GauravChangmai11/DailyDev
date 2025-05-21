import { Client } from "pg";

export async function connect_db(){
    const db = new Client("postgresql://postgres:ChangmaiGaurav123@localhost:5432/demo")
    try{
        await db.connect()
        console.log("connected to db");
        return db
    } catch(e){
        console.log("error connecting to database");
    }
}