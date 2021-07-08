import { Navbar, Nav } from 'react-bootstrap'

// a functional component by default can disply JSX and use props

const MyNavBar = (props) => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link href="#features">Menu</Nav.Link>
                <Nav.Link href="#pricing">Reservations</Nav.Link>
                <Nav.Link href="#pricing">Find us</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default MyNavBar