import axios from "axios";

class ChartDataService {

    getExerciseRecord(user_id, end_date) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/record/${user_id}/${end_date}/0`);
    }
    getFoodRecord(user_id, end_date) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/record/${user_id}/${end_date}/1`);
    }

}

export default new ChartDataService();