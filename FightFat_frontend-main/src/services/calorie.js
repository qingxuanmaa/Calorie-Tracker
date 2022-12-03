import axios from "axios";

class CalorieDataService {
    getFoodCalorie() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/foodCalorieList`);
    }
    getExerciseCalorie() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/exerciseCalorieList`);
    }
    addFoodCalorie(data){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/foodCalorieList`,data);
    }
   
}

export default new CalorieDataService();