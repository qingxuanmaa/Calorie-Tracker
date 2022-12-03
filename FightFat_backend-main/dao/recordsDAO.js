import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId

let records;

export default class RecordsDAO {

    static async injectDB(conn){
        if (records) {
            return;
        }
        try {
            records = await conn.db(process.env.FIGHTFAT_NS).collection('user_record_list');
        } catch(e){
            console.error(`Unable to establish connection handle in recordsDA: ${e}`);
        }
    }


    static async getRecordsWeekSum(userId, dates, type) {
        let cursor;
        try {
            cursor = await records.find({user_id: userId, date: {$in: dates}, type: type})
            const recordList = await cursor.toArray();
            var lookup = {}
            recordList.forEach(function(ele) {
                const date = ele["date"];
                const calories = ele["calories"]; 
                if (date in lookup) {
                    lookup[date] = parseFloat(calories) + lookup[date]
                } else {
                    lookup[date] = parseFloat(calories)
                }
            });
            let res = [];
            dates.forEach(date => {
                res.push(lookup[date])
            })
            res.forEach(function(date, i, arr) {
                if (!date) {
                    arr[i] = 0;
                }
            })
            return res;
        } catch (e) {
            console.error(`Something went wrong in getRecords: ${e}`);
            throw e;
        }
    }

    static async getRecordsSumByDate(userId, date, type) {
        let cursor;
        try {
            cursor = await records.find({user_id: userId, date: date, type:type});
            const recordList = await cursor.toArray();
            let sum = 0;
            recordList.forEach(function(ele) {
                sum += parseFloat(ele["calories"]);
            });
            return sum;
        } catch (e) {
            console.error(`Something went wrong in getRecords: ${e}`);
            throw e;
        }
    }


    static async getFoodRecordsById(userId) {
        let cursor;
        try {
            cursor = await records.find({user_id: userId, type: "1"});
            const recordList = await cursor.toArray();
            return recordList;
        } catch(e) {
            console.error(`Something went wrong in getRecords: ${e}`);
            throw e;
        }
    } 

    static async getExerciseRecordsById(userId) {
        let cursor;
        try {
            cursor = await records.find({user_id: userId, type: "0"});
            const recordList = await cursor.toArray();
            return recordList;
        } catch(e) {
            console.error(`Something went wrong in getRecords: ${e}`);
            throw e;
        }
    } 

    static async getRecordsById(userId) {
        let cursor;
        try {
            cursor = await records.find({user_id: userId});
            const recordList = await cursor.toArray();
            return recordList;
        } catch(e) {
            console.error(`Something went wrong in getRecords: ${e}`);
            throw e;
        }
    } 

    static async addRecord(name, userId, calories, unit, date, type){
        try {
            const recordDoc = {
                user_id: userId,
                date: date,
                calories: calories,
                item_name: name,
                type: type,
                unit: unit 
            }
            return await records.insertOne(recordDoc);
        }
        catch(e){
            console.error(`Unable to post record: ${e}`);
            return { error: e };
        }
    }

    static async deleteRecord(recordId, userId) {
        try {
            const recordDoc = {
                _id: ObjectId(recordId),
                user_id: userId
            }
            return await records.deleteOne(recordDoc);
        }
        catch(e){
            console.error(`Unable to delete record: ${e}`);
            return { error: e };
        }
    }

}