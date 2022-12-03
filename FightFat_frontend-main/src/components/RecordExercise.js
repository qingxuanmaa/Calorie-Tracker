import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';

import "./RecordExercise.css";
import { Row, Col } from 'react-bootstrap';
// import { Formik, Field, Form } from "formik";
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-date-picker';
import UserRecordDataService from "../services/userRecord";
import FormBoostrap from 'react-bootstrap/Form';

import Reacttable from './ReactRecordTable';



const RecordExercise = ({
    user,
    calorieTable
 }) => {
    // const [date, onDateChange] = useState(new Date());
    const [item, setItem] = useState();
    const [itemUnit, setItemUnit] = useState({
        user_id:"",
        date:new Date(),
        item_name:"Jogging",
        type:"0",
        unit:"0"
      

    });

    // name,
    // userId,
    // calories,
    // unit,
    // date,
    // type
    const [records, setRecords] = useState([]);

    const retrieveRecords = useCallback(() => {

        if (user){
        UserRecordDataService.getExerciseRecordList(user.googleId)
            .then(response => {
                setRecords(response.data)
                console.log(response);
                setItemUnit((itemUnit) =>({
                    ...itemUnit, user_id:user.googleId
                }))
         
            })
            .catch(e => {
                console.log(e);
            });}
    }, [user]);

    const addRecord = useCallback((itemUnit)=>{
        console.log(user)
        if(user){

            // setItemUnit((itemUnit) =>({
            //     ...itemUnit, type:"1"
            // }))
            console.log(user.googleId)
            setItemUnit((itemUnit) =>({
                ...itemUnit, user_id:user.googleId
            }))
            console.log(itemUnit)
            UserRecordDataService.addRecord(itemUnit)
            .then(response => {
                console.log(response)
            })
            .catch(e => {
                console.log(e);
            });}
            retrieveRecords();
            retrieveRecords();

    },[user]);

    const options = calorieTable.map((item) => {
        return (
          <option key={item._id} >
            {item.item_name}
        
          </option>
        )
      })

    // Use effect to carry out side effect functionality
    useEffect(() => {
        retrieveRecords();
        if(user){
            console.log(user);
            console.log(user.googleId);
            //  setItemUnit((itemUnit) =>({
            //     ...itemUnit, user_id:user.googleId
            // }))
        }

        
    }, [retrieveRecords]);
    return (
        <div>
            <Container className="recordingContainer">
                <FormBoostrap>
                    <Row>
                        <Col>
                            <Row>
                                <FormBoostrap.Group className="form-group firstLine">
                                    <FormBoostrap.Label>Select Exercise you did</FormBoostrap.Label>
                                    <FormBoostrap.Control
                                        as="select"
                                        onChange={(e) => {
                                            setItemUnit(itemUnit=>
                                                ({...itemUnit, item_name:e.target.value})
                                            )
                                            console.log(e.target.value)
                                        }}
                                    >
                                        {options}
                                    </FormBoostrap.Control>
                                </FormBoostrap.Group>
                            </Row>
                            <Row>
                                <FormBoostrap.Group className="form-group">
                                    <FormBoostrap.Label>How long did you exercise (min)</FormBoostrap.Label>
                            
                                       <input 
                                            // onChange={(e) => {
                                            //     setItem(item=>
                                            //         ({...item, item_name:e.target.value})
                                            //     )
                                            // }}
                                            // type="text"
                                            // pattern="[0-9]*"
                                            value={itemUnit.unit}
                                            onChange={(e) =>
                                                setItemUnit((itemUnit) => 
                                                    ({
                                                    ...itemUnit,
                                                    unit:e.target.value }))
                                            }
                                        />
              
                                </FormBoostrap.Group>
                            </Row>
                            <Row>
                       
                                <FormBoostrap.Label>When did you exercise (min)</FormBoostrap.Label>
                                
                                <DatePicker onChange={(e) =>{
                                    // setItemUnit((itemUnit) =>({
                                    //     ...itemUnit, user_id:user.googleId
                                    // }))
                                    setItemUnit((itemUnit) =>({
                                        ...itemUnit, date:e
                                    }))
                                    // console.log(e)
                                }
                                    } value={itemUnit.date} calendarAriaLabel="Toggle calendar" maxDate={new Date()} className={"selectDate"} />
                            
                            </Row>
                            <Row>
                            <FormBoostrap.Group className="form-group">
                                <Button onClick={() => {
                                // setItemUnit((itemUnit) =>({
                                //     ...itemUnit, user_id:user.googleId
                                // }))
                                    addRecord(itemUnit)}}>Submit</Button>
                                </FormBoostrap.Group>
                            </Row>
                            
                        </Col>
                        <Col>
                            <Row>
                                <Container className='firstLine'/>
                            </Row>
                            <Row>
                                <Reacttable 
                                
                                recordingTable = {records}
                                title = "Exercise"
                                unit = "min"
                                ratio={1}
                                ></Reacttable>
                            </Row>
                        </Col>
                    </Row>
                </FormBoostrap>
            </Container>
        </div>
    )
}

export default RecordExercise;