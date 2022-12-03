import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId

let calItems;

export default class FoodCalorieItemsDAO {
    static async injectDB(conn) {
        if (calItems) {
            return;
        }
        try {
            calItems = await conn.db(process.env.FIGHTFAT_NS)
                            .collection('food_calorie_list');
        }
        catch(e) {
            console.error(`Unable to connect in CalorieItemsDAO: ${e}`);
        }
    }

    static async getCalItems({        
        filters = null,
        page = 0,
        CalItemsPerPage = 30,
        } = {}){
        let query;
        if (filters) {
            if ("item_name" in filters){
                query = { $text: {$search: filters['item_name']}};
            }
        }

        let cursor;
        try {
            cursor = await calItems.find(query)
                                .limit(CalItemsPerPage)
                                .skip(CalItemsPerPage * page);
            const CalList = await cursor.toArray();
            const totalNumCalItems = await calItems.countDocuments(query);
            return {CalList, totalNumCalItems};
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return { CalList: [], totalNumCalItems: 0 };
        }
    }

    static async getCalItemsByName(item_name) {
        let cursor;
        try {
            cursor = await calItems.find({item_name: item_name})
            const calRes = await cursor.toArray();
            return calRes[0]["kcal_100g"];
        }
        catch(e) {
            console.error(`Unable to get calorie item: ${e}`)
            return { error: e };
        }
    }

    static async addCalItem(name, calories_100g) {
        try {
            const itemDoc = {
                item_name: name,
                kcal_100g: calories_100g
            }
            return await calItems.insertOne(itemDoc);
        }
        catch(e) {
            console.error(`Unable to post calorie item: ${e}`)
            return { error: e };
        }
    }

    static async updateCalItem(ItemId, name, calories_100g) {
        try {
            return await calItems.updateOne({"_id": ObjectId(ItemId)},
              {$set: {"kcal_100g": calories_100g, "item_name": name}});
        } catch(e) {
            console.error(`Unable to update calorie item: ${e}`)
            return {error: e};
        }
    }

    static async deleteCalItem(ItemId) {
        try {
            return await calItems.deleteOne({"_id": ObjectId(ItemId)});
        } catch(e) {
            console.error(`Unable to delete calorie item: ${e}`)
            return { error: e};
        }
    }
}