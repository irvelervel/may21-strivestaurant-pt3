// for having a state, you need a class

// 1) we're going to create our empty state, you want to make room for your data
// 2) we want to prepare our UI for showing the reservations

// 3) we want to fetch the reservations from the endpoint
// 4) we want to put them into the state


// WHAT HAPPENS WHEN YOU REFRESH THE PAGE AND SHOW RESERVATIONS.JSX?

// 1) STATE GETS INITIALIZED
// 2) RENDER() FIRES, MAPPING THE EMPTY RESERVATIONS ARRAY (-> not showing anything)
// 3) COMPONENTDIDMOUNT GETS FIRED



// initial render
// componentDidMount
// another render??!?

// EVERY TIME YOU CHANGE THE STATE YOU GET RENDER() FIRED AGAIN
// EVERY TIME YOU GET NEW PROPS YOU GET RENDER() FIRED AGAIN

import { Component } from "react";
import { Col, Container, Row } from 'react-bootstrap'

class Reservations extends Component {

    // once you create the state for your component, you have to assign an initial value
    // for a string --> ''
    // for a number --> 0, 1
    // for an array --> []

    // constructor(props) {
    //     super(props)
    //     console.log('THIS IS CONSTRUCTOR')
    //     this.myFunction = this.myFunction.bind(this)
    // }

    state = {
        reservations: []
    }

    // the perfect place for doing a fetch in a React Component
    // we need a method that we're sure is going to be called just ONCE
    // for every lifetime of our component

    componentDidMount = async () => {
        // componentDidMount is a method that gets triggered just a moment
        // after the initial invocation of render()
        console.log('THIS IS COMPONENTDIDMOUNT')
        // this is where we'll fetch the data

        // a fetch can potentially be a very expensive operation
        // it can take seconds!!

        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/reservation')
            if (response.ok) {
                // we got the reservations array!
                // console.log(response)
                let data = await response.json()
                // data should be the array of reservations by now!
                this.setState({
                    reservations: data
                })
            } else {
                // we encountered an error!
                alert('we got an error!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    myFunction() {
        console.log(this.state)
        // crashing!! 'this' is undefined?!? what the heck?
        // it's because myFunction is written in ES5 syntax
        // ARROW FUNCTIONS instead automatically carry the 'this' into them
        // if you want to use normal functions (I'm against it :D) and
        // you want to use 'this' into them, you'll need to manually
        // bind them in the constructor method (example above)
    }

    // you want the user to immediately be entertained by some content
    // after they are presented with something to see, we can do our expensive operations
    // under the hood, in the componentDidMount

    render() {
        console.log('THIS IS RENDER')

        return (
            <Container>
                <Row className="justify-content-center my-5">
                    <Col xs={12} md={6} className="text-center">
                        <h1 onClick={this.myFunction}>RESERVATIONS GO HERE!</h1>
                        <h3>HERE ARE THE CURRENT RESERVATIONS!</h3>
                        {this.state.reservations.map(r => (
                            <div key={r._id}>{r.name}</div>
                        ))}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Reservations