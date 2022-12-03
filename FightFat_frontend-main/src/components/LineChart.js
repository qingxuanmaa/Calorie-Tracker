import React, {useState, useEffect, useCallback} from 'react';
import {Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend} from 'chart.js';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-date-picker';
import ChartDataService from "../services/chart";
import FormBoostrap from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import "./LineChart.css";

ChartJS.register(
    Legend,
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement
)

const LineChart = ({user}) => {
  const [exerciseConsump, setExerciseConsump] = useState([]);
  const [foodIntake, setFoodIntake] = useState([]);
  const [endDate, setEndDate] = useState(new Date());

  const year = endDate.getFullYear();
  const month = endDate.getMonth() + 1;
  let day = endDate.getDate();
  let endDateInput = year + '-' + month + '-' + day;

  const retrieveExercise = useCallback(() => {
    if(user) {
      ChartDataService.getExerciseRecord(user.googleId, endDateInput)
      .then(response => {
        setExerciseConsump(response.data)
      })
      .catch(e => {
          console.log(e);
      });
    }
    },[user,endDateInput]);

  const retrieveFood = useCallback(() => {
    if(user) {
      ChartDataService.getFoodRecord(user.googleId, endDateInput)
        .then(response => {
          setFoodIntake(response.data)
        })
        .catch(e => {
            console.log(e);
        });
    }
    },[user,endDateInput]);


  // get 7 dates
  let week = [6,5,4,3,2,1,0]; 
  week.forEach(function(day, i, arr){
    let pre = new Date(endDate); 
    pre.setDate(pre.getDate()-day); 
    arr[i] = pre.toDateString();  
  })

  useEffect(() => {
    retrieveFood();
  }, [endDate, retrieveFood]);

  useEffect(() => {
    retrieveExercise();
  }, [endDate, retrieveExercise]);




  const labels = week;
  const data = {
    labels: labels,
    datasets: [
      {
      label: 'Food',
      data: foodIntake,
      backgroundColor: ['rgba(255, 102, 102, 0.2)'],
      borderColor: ['rgba(255, 153, 153, 1)'],
    }, 
      {
      label: 'Exercise',
      data: exerciseConsump,
      backgroundColor: ['rgba(0, 153, 255, 0.2)'],
      borderColor: ['rgba(153, 204, 255, 1)'],
    }],
  }

  var options = {
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
          grid: {
              display:false
          },
          ticks: {
            color: 'black'
          }
      },
      y: {
        beginAtZero: true,
          grid: {
              display:false
          },
          ticks: {
            color: 'black'
          }   
      }
    }   
  }

  return (
    <div>
      <Container className="chartContainer">
        <FormBoostrap>
          <Row>
              <Col>
                <Row>
                Select Date
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  endDate={endDate}
                  value={endDate}
                  maxDate={new Date()}
                />
                </Row>
              </Col>
          </Row>
        </FormBoostrap>
      </Container>
      
      <div style={{height: "500px", width: "900px", margin: "auto"}}>
        <Line 
          data={data}
          options={options}
        />
      </div>
    </div>
  )
}

export default LineChart;