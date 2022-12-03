import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';

import "./RecordExercise.css";
import { Row, Col } from 'react-bootstrap';

import FormBoostrap from 'react-bootstrap/Form';

import Reacttable from './ReactTable';
import ReactExercisetable from './ReactExerciseTable'
import "./RecordExercise.css";
import Alert from 'react-bootstrap/Alert';




const CalorieTable = ({
    calorieTable,
    exercisedCalorieTable
 }) => {

    const closeGuide = useCallback(() => {

        setRead(false);
        console.log(read)
    }, []);
    const [read, setRead] = useState(true);
    return (
        <div>
         

            <Alert variant="primary">
            <Alert.Heading>Guide</Alert.Heading>  
                Record your food and exercise after login with Google credential, and see the summary for your linechart result!</Alert>
{/*           
            <Alert className="alert alert-warning alert-dismissible fade show">
         <strong>Guide</strong> Record your food and exercise after login with Google credential, and see the summary for your linechart result!
             <button type="button"  class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </Alert> */}

            <Container className="recordingContainer">
                <FormBoostrap>
                    <Row>
                        <Col>
                            <div className='firstLine'></div>
                            <Reacttable 
                                calorie={ calorieTable }
                            
                            ></Reacttable>
                            
                        </Col>
                        <Col>
                            <div className='firstLine'></div>
                            <ReactExercisetable 
                                calorie={ exercisedCalorieTable }
                            
                            ></ReactExercisetable>
                        </Col>
                    </Row>
                    
                </FormBoostrap>
            </Container>
        </div>
    )
}

export default CalorieTable;