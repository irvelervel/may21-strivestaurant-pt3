import { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

// name -> string
// phone -> number | string
// numberOfPeople -> number | string
// smoking -> boolean
// dateTime -> string
// specialRequests -> string

// every input of our form will be CONTROLLED
// this means that its value will be always stored in our component's state

// for having a CONTROLLED FORM we need a component STATE

class ReservationForm extends Component {

    state = {
        reservation: {
            name: '',
            phone: '',
            numberOfPeople: 1,
            smoking: false,
            dateTime: '',
            specialRequests: '',
        },
    }

    handleInput = (key, value) => {
        // setState is not about OVERWRITING
        // it's about MERGING

        this.setState({
            // which key?
            // with what value?
            reservation: {
                ...this.state.reservation,
                [key]: value
            }
        })
    }

    submitReservation = async (e) => {
        e.preventDefault()
        console.log(this.state.reservation)
        // now let's send this reservation object to the API
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/reservation", {
                method: 'POST',
                body: JSON.stringify(this.state.reservation),
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization if you have it
                }
            })
            if (response.ok) {
                // if we fall here
                // everything went well!
                alert('RESERVATION SAVED!')
                this.setState({
                    reservation: {
                        name: '',
                        phone: '',
                        numberOfPeople: 1,
                        smoking: false,
                        dateTime: '',
                        specialRequests: '',
                    },
                })
            } else {
                // we fall here if an error occurred from the server
                // 400
                // 401
                // 404
                // 500
                alert('SOMETHING WENT WRONG ON THE SERVER')
            }
        } catch (error) {
            // generic error section
            console.log(error)
        }
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center my-5">
                    <Col xs={12} md={6} className="text-center">
                        <h2>Book your table NOW!</h2>
                        <Form onSubmit={this.submitReservation}>
                            {/* every Form.Group in react bootstrap is input field */}
                            <Form.Group>
                                <Form.Label>Your name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    value={this.state.reservation.name}
                                    onChange={(e) => {

                                        this.handleInput('name', e.target.value)

                                        // this will be triggered every time
                                        // we input a character into the field
                                        // this.setState({
                                        //     reservation: {
                                        //         ...this.state.reservation,

                                        //         // phone: this.state.reservation.phone,
                                        //         // smoking: this.state.reservation.smoking,
                                        //         // specialRequests: this.state.reservation.specialRequests,

                                        //         name: e.target.value
                                        //         // e.target.value is the current value of the field
                                        //     }
                                        // })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Your phone</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter your phone"
                                    value={this.state.reservation.phone}
                                    onChange={(e) => this.handleInput('phone', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>How many people are you?</Form.Label>
                                <Form.Control as="select"
                                    value={this.state.reservation.numberOfPeople}
                                    onChange={(e) => this.handleInput('numberOfPeople', e.target.value)}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Do you smoke?"
                                    checked={this.state.reservation.smoking}
                                    onChange={(e) => this.handleInput('smoking', e.target.checked)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Date and time</Form.Label>
                                <Form.Control type="datetime-local"
                                    value={this.state.reservation.dateTime}
                                    onChange={(e) => this.handleInput('dateTime', e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Do you have any special request?</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    value={this.state.reservation.specialRequests}
                                    onChange={(e) => this.handleInput('specialRequests', e.target.value)} />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Save reservation
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default ReservationForm