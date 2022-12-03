import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import FoodCalorieItemsDAO from './dao/FoodCalorieItemsDAO.js';
import ExerciseCalorieItemsDAO from './dao/ExerciseCalorieItemsDAO.js';
import RecordsDAO from './dao/recordsDAO.js';

async function main(){
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.FIGHTFAT_DB_URI
    )
    const port = process.env.PORT || 8000;

    try{
        //connect to mongoDB server
        await client.connect();
        await FoodCalorieItemsDAO.injectDB(client);
        await ExerciseCalorieItemsDAO.injectDB(client);
        await RecordsDAO.injectDB(client);

        app.listen(port,() => {
            console.log('Server is running on port: ' + port);
        })
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);