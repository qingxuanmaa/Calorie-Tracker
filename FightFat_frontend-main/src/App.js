import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import RecordExercise from "./components/RecordExercise";
import RecordFood from "./components/RecordFood";
import LineChart from './components/LineChart.js';

import './App.css';

import Login from "./components/Login";
import Logout from "./components/Logout";
import { GoogleOAuthProvider } from '@react-oauth/google';
import CalorieDataService from "./services/calorie"
import CalorieTable from "./components/CalorieTable";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;


function App() {

  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [doSaveFaves, setDoSaveFaves] = useState(false);
  const [favMovies, setFavMovies] = useState([]);
  const [calorie, setCalorie] = useState([]);
  const [foodCalorieTable, setFoodCalorieTable] = useState([]);

  const [exercisedCalorieTable, setExerciseCalorieTable] = useState([]);
  // const [userFoodCalorieTable, setUserFoodCalorieTable] = useState([]);

  // const retrieveCalorie = useCallback(() => {
  //   calorie.getAll(user.googleId)
  //     .then(response => {
  //       setFavorites(response.data.favorites);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }, [user]);

  const retrieveCalorie = useCallback(() => {
    CalorieDataService.getFoodCalorie()
        .then(response => {
            setFoodCalorieTable(response.data.CalList)
            // console.log(response.data.CalList)
        })
        .catch(e => {
            console.log(e);
        });
}, [user]);
const retrieveExerciseCalorie = useCallback(() => {
  CalorieDataService.getExerciseCalorie()
      .then(response => {
          setExerciseCalorieTable(response.data.CalList)
          // console.log(response.data.CalList)
      })
      .catch(e => {
          console.log(e);
      });
}, [user]);

  useEffect(() => {
        retrieveCalorie();
        
    }, [retrieveCalorie]);

    useEffect(() => {
      retrieveExerciseCalorie();
      
  }, [retrieveExerciseCalorie]);
    

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if(loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        setUser(loginData);
        
      } else {
        localStorage.setItem("login", null);
      }
    }
    console.log(user)
  }, []);
  
  useEffect(() => {
    retrieveCalorie();
}, [retrieveCalorie]);



  return (
    
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Navbar bg="white" expand="lg" sticky="top" variant="dark" >
        <Container className="container-fluid">
        <Navbar.Brand className="brand" href="/">
          <img src="/images/fightfat_logo.png" alt="FightFatlogo" className="fightfatLogo"/>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ms-auto">
            
            {user &&
                <Nav.Link as={Link} to={"/recordExercise"} className="navbar-nav nav-link link">
                  <button type="button" class="btn btn-warning">
                  Exercise
                  </button>
                </Nav.Link>
              }
            {user &&
                <Nav.Link as={Link} to={"/recordFood"} className="navbar-nav nav-link link">
                  <button type="button" class="btn btn-warning">
                    Food  
                  </button>
                </Nav.Link>
              }
          
            <Nav.Link as={Link}  to={"/calorieTable"} className="navbar-nav nav-link link">
            <button type="button" class="btn btn-warning">
              Calorie List
                </button>
              
            </Nav.Link>
            {user && <Nav.Link as={Link}  to={"/LineChart"} className="navbar-nav nav-link link">
            <button type="button" class="btn btn-warning">
            Summary
                  </button>
              
            </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        { user ? (
                <Logout setUser={setUser} />
              ) : (
                <Login setUser={setUser} />
              )}
        </Container>
      </Navbar>

      <Routes>
        <Route exact path={"/"} element={<CalorieTable
            user={ user }
            calorieTable={ foodCalorieTable }
            exercisedCalorieTable={ exercisedCalorieTable }
        
          />}
          />
          <Route exact path={"/recordExercise"} element={
          <RecordExercise 
            user={ user }
            calorieTable={ exercisedCalorieTable }
 
          />}
          />
          <Route exact path={"/calorieTable"} element={
          <CalorieTable
            user={ user }
            calorieTable={ foodCalorieTable }
            exercisedCalorieTable={ exercisedCalorieTable }
        
          />}
          />
          <Route exact path={"/recordFood"} element={
            
            <RecordFood
              user={ user }
              calorieTable={ foodCalorieTable }
              // userFoodCalorieTable={userFoodCalorieTable}
            />
            }
          />
        <Route path={"/LineChart"} element={
          
          <LineChart user={ user } />}
          />
      </Routes>
      </div>
      </GoogleOAuthProvider>
  );
}

export default App;
