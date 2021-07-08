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
import { Container, ListGroup, Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

import Loading from "./Loading";
import Error from "./Error";
// import { parseISO, format } from 'date-fns'

import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

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
        reservations: [],
        isLoading: true,
        isError: false
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

            // this.setState({
            //     isLoading: true
            // })

            let response = await fetch('https://striveschool-api.herokuapp.com/api/reservation')

            if (response.ok) {
                // we got the reservations array!
                // console.log(response)
                let data = await response.json()
                // data should be the array of reservations by now!
                this.setState({
                    reservations: data,
                    isLoading: false,
                    isError: false
                })
            } else {
                // we encountered an error!
                this.setState({
                    isLoading: false,
                    isError: true
                })
            }
        } catch (error) {
            console.log('BIG ERRORRRR!!', error)
            this.setState({
                isError: true,
                isLoading: false
            })
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

    // from 2021-11-27T20:00:00.000Z
    // into Saturday, November the 27th

    // Date()

    render() {
        console.log('THIS IS RENDER')

        return (
            <Container>
                <Row className="justify-content-center my-5">
                    <Col xs={12} md={6} className="text-center">
                        <h1
                        // onClick={this.myFunction}
                        >RESERVATIONS GO HERE!</h1>
                        <h3>HERE ARE THE CURRENT RESERVATIONS!</h3>

                        {this.state.isError === true && <Error />}
                        {this.state.isLoading === true
                            ? <Loading />
                            : <ListGroup>
                                {this.state.reservations.map(r => (
                                    <ListGroup.Item key={r._id}>
                                        From: {r.name} - For: {r.numberOfPeople} - At: {format(parseISO(r.dateTime), 'dd MMMM yyyy - HH:mm')}
                                        {/* we want to format dateTime, which is currently a string,
                                    into something more readable */}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        }

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Reservations