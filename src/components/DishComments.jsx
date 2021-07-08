import { Row } from 'react-bootstrap'

const DishComments = (props) => (
    <Row className="justify-content-center mt-4">
        <ul>
            {
                // DELIMITING THE DYNAMIC PART
                // DELIMITING THE JS CODE
                props.dish.comments.map(c => (
                    <li key={c.id}>{c.comment}</li>
                ))
            }
        </ul>
    </Row>
)

export default DishComments