import ExerciseCalorieItemsDAO from "../dao/ExerciseCalorieItemsDAO.js";

export default class ExerciseCalorieItemsController {

    static async apiGetCalItems(req, res, next) {
        const calItemsPerPage = req.query.calItemsPerPage ? 
            parseInt(req.query.calItemsPerPage) : 30;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {}
        if (req.query.name) {
            filters.name = req.query.name;
        } 
        const {CalList, totalNumCalItems} = await ExerciseCalorieItemsDAO.getCalItems({ filters, page, calItemsPerPage});
        
        let response = {
            CalList: CalList,
            page: page,
            filters: filters,
            entries_per_page: calItemsPerPage,
            total_results: totalNumCalItems,
        };
        res.json(response);
    }
    

    static async apiUpdateCalItem(req, res, next) {
        try {
            const itemId = req.body.item_id;
            const name = req.body.item_name;
            const calories_per_min = req.body.kcal_per_min;
            const CalItemResponse = await ExerciseCalorieItemsDAO.updateCalItem(
                itemId,
                name,
                calories_per_min
            );
            let change = CalItemResponse.modifiedCount;
            if (change < 1) {
                res.status(500).json({ error: "No changes happened!"});
            }
            var { error } = CalItemResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to post calorie item."});
            } else {
                res.json({ status: "success" });
            }
        } catch(e) {
            res.status(500).json({ error: e.message });
        }      
    }

    static async apiDeleteCalitem(req, res, next) {
        try {
            const itemId = req.body.item_id;
            const CalItemResponse = await ExerciseCalorieItemsDAO.deleteCalItem(
                itemId
            );
            var { error } = CalItemResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to delete calorie item."});
            } else {
                res.json({ status: "success" });
            }
        } catch(e) {
            res.status(500).json({ error: e.message });
        } 
    }

    static async apiAddCalItem(req, res, next){
        try {
            const name = req.body.item_name;
            const calories_per_min = req.body.kcal_per_min;

            const CalItemResponse = ExerciseCalorieItemsDAO.addCalItem(
                name,
                calories_per_min
            );
            var { error } = CalItemResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to add a calorie item."});
            } else {
                res.json({ status: "success" });
            }
        } catch(e) {
            res.status(500).json({ error: e.message });
        } 
    }
}