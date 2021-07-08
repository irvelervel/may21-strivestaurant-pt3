// for having a state, you need a class

// 1) we're going to create our empty state, you want to make room for your data
// 2) we want to prepare our UI for showing the reservations

// 3) we want to fetch the reservations from the endpoint
// 4) we want to put them into the state


// WHAT HAPPENS WHEN YOU REFRESH THE PAGE AND SHOW RESERVATIONS.JSX?

// 1) STATE GETS INITIALIZED
// 2) RENDER() FIRES, MAPPING THE EMPTY RESERVATIONS ARRAY (-> not showing anything)
// 3) COMPONENTDIDMOUNT GETS FIRED


import { Component } from "react";
import { Col, Container, Row } from 'react-bootstrap'

class Reservations extends Component {

    // once you create the state for your component, you have to assign an initial value
    // for a string --> ''
    // for a number --> 0, 1
    // for an array --> []

    state = {
        reservations: []
    }

    // the perfect place for doing a fetch in a React Component
    // we need a method that we're sure is going to be called just ONCE
    // for every lifetime of our component

    componentDidMount() {
        // componentDidMount is a method that gets triggered just a moment
        // after the initial invocation of render()
        console.log('THIS IS COMPONENTDIDMOUNT')
    }

    render() {
        console.log('THIS IS RENDER')
        return (
            <Container>
                <Row className="justify-content-center my-5">
                    <Col xs={12} md={6} className="text-center">
                        <h1>RESERVATIONS GO HERE!</h1>
                        <h3>HERE ARE THE CURRENT RESERVATIONS!</h3>
                        {this.state.reservations.map(r => (
                            <div>{r.name}</div>
                        ))}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Reservations