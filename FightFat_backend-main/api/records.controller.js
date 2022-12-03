import RecordsDAO from "../dao/recordsDAO.js";
import FoodCalorieItemsDAO from "../dao/FoodCalorieItemsDAO.js";
import ExerciseCalorieItemsDAO from "../dao/ExerciseCalorieItemsDAO.js";


export default class RecordsController {
    
    static async apiPostRecord(req, res, next) {
        try {
            const name = req.body.item_name;
            const userId = req.body.user_id;
            const type = req.body.type;
            const unit = req.body.unit;
            const date = req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString();
            let cal_unit;
            if (type === "1") {
                cal_unit = await FoodCalorieItemsDAO.getCalItemsByName(name);
            } else if (type === "0") {
                cal_unit = await ExerciseCalorieItemsDAO.getCalItemsByName(name);
            }
            const calories = parseFloat(cal_unit) * parseFloat(unit)

            const recordsResponse = await RecordsDAO.addRecord(
                name,
                userId,
                calories,
                unit,
                date,
                type
            );

            var { error } = recordsResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to post record."});
            } else {
                res.json({ status: "success" });
            }
        } catch(e) {
            res.status(500).json({ error: e.message} );
        }
    }

    static async apiGetRecord(req, res, next) {
        try {
            let user_id = req.params.userId || {};
            let records = await RecordsDAO.getRecordsById(user_id);
            if (!records) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(records);
        } catch(e) {
            res.status(500).json({ error: e.message});
        }
    }

    static async apiGetFoodRecordsWeekSum(req, res, next) {
        try {
            let week = [6,5,4,3,2,1,0];
            let user_id = req.params.userId;
            let date = new Date(req.params.date);
            let type = req.params.type;
            week.forEach(function(day, i, arr) {
                let pre = new Date(date.getTime());
                pre.setDate(date.getDate()-day);
                arr[i] = pre.toDateString(); 
            })
            const records = await RecordsDAO.getRecordsWeekSum(user_id, week, type);
            
            res.json(records);
        } catch(e) {
            res.status(500).json({ error: e.message} );
        }
    }

    static async apiGetRecordsWeekSumByDate(req, res, next) {
        try {
            let week = [6,5,4,3,2,1,0];
            let user_id = req.params.userId;
            let date = new Date(req.params.date);
            let type = req.params.type;
            week.forEach(function(day, i, arr) {
                let pre = new Date(date.getTime());
                pre.setDate(date.getDate()-day);
                arr[i] = pre.toDateString(); 
            })
            let records = [];
            for (let i = 0; i < 7; i++) {
                const day = await RecordsDAO.getRecordsSumByDate(user_id, week[i], type);
                records.push(day);
            }
            res.json(records);
        } catch(e) {
            res.status(500).json({ error: e.message} );
        }
    }

    static async apiGetFoodRecord(req, res, next) {
        try {
            let user_id = req.params.userId || {};
            let records = await RecordsDAO.getFoodRecordsById(user_id);
            if (!records) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(records);
        } catch(e) {
            res.status(500).json({ error: e.message} );
        }
    }

    static async apiGetExerciseRecord(req, res, next) {
        try {
            let user_id = req.params.userId || {};
            let records = await RecordsDAO.getExerciseRecordsById(user_id);
            if (!records) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(records);
        } catch(e) {
            res.status(500).json({ error: e.message} );
        }
    }

    static async apiDeleteRecord(req, res, next) {
        try {
            
            const recordId = req.body.record_id;
            const userId = req.body.user_id;

            const recordResponse = await RecordsDAO.deleteRecord(
                recordId,
                userId
            );

            var { error } = recordResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to delete record."});
            } else {
                res.json({ status: "success" });
            }
        } catch(e) {
            res.status(500).json({ error: e.message} );
        }
    }
}