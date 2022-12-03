import axios from "axios";

class RecordListDataService {
    getFoodRecordList(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/foodRecord/${userId}`);
    }
    getExerciseRecordList(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/exerciseRecord/${userId}`);
    }
    addRecord( data){
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/fightFat/record`, data);
    }
    getExerciseList(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/foodRecord/${userId}`);
    }

   
}

export default new RecordListDataService();