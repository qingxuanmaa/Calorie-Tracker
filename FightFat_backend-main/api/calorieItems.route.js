import express from 'express';
import FoodCalorieItemsController from './FoodCalorieItems.controller.js';
import ExerciseCalorieItemsController from './ExerciseCalorieItems.controller.js';
import RecordsController from './records.controller.js';

const router = express.Router(); // get access to express router

router.route("/foodCalorieList").get(FoodCalorieItemsController.apiGetCalItems);
router.route("/foodCalorieList").post(FoodCalorieItemsController.apiAddCalItem);
router.route("/foodCalorieList").delete(FoodCalorieItemsController.apiDeleteCalitem);
router.route("/foodCalorieList").put(FoodCalorieItemsController.apiUpdateCalItem);
router.route("/exerciseCalorieList").get(ExerciseCalorieItemsController.apiGetCalItems);
router.route("/exerciseCalorieList").post(ExerciseCalorieItemsController.apiAddCalItem);
router.route("/exerciseCalorieList").delete(ExerciseCalorieItemsController.apiDeleteCalitem);
router.route("/exerciseCalorieList").put(ExerciseCalorieItemsController.apiUpdateCalItem);

router.route("/record/:userId/:date/:type").get(RecordsController.apiGetFoodRecordsWeekSum);
router.route("/record").post(RecordsController.apiPostRecord);
router.route("/record").delete(RecordsController.apiDeleteRecord);
router.route("/record/:userId").get(RecordsController.apiGetRecord);
router.route("/foodRecord/:userId").get(RecordsController.apiGetFoodRecord);
router.route("/exerciseRecord/:userId").get(RecordsController.apiGetExerciseRecord);


export default router;