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



const RecordFood = ({
    user,
    calorieTable
 }) => {
    // const [date, onDateChange] = useState(new Date());
    const [item, setItem] = useState();
    const [itemUnit, setItemUnit] = useState({
        user_id:"",
        type:"1",
        date:new Date(),
        item_name:"Banana",
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
        UserRecordDataService.getFoodRecordList(user.googleId)
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

            if (itemUnit.unit == "0"){

            }
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
                                    <FormBoostrap.Label>Select Food you eat</FormBoostrap.Label>
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
                                    <FormBoostrap.Label>How much did you eat (g)</FormBoostrap.Label>
                            
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
                       
                                <FormBoostrap.Label>When did you eat (g)</FormBoostrap.Label>
                                
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
                                <Button className="btn" onClick={() => {
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
                                title = "Food"
                                unit = "g"
                                ratio = {100}
            
                                ></Reacttable>
                            </Row>
                        </Col>
                    </Row>
                </FormBoostrap>
            </Container>
        </div>
    )
}

export default RecordFood;