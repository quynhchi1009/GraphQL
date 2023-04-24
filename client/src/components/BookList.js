import React, {useState} from "react";
import Card from 'react-bootstrap/Card'
// import CardColumns from 'react-bootstrap/CardColumns'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from "./Form.module.scss"
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from '../graphql-client/queries'

var classNames = require('classnames/bind');
var cx = classNames.bind(styles);

const BookList = () => {
    const [bookSelected, setBookSelected] = useState(null)

    const { loading, error, data } = useQuery(getBooks)
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error in BookList!</p>

    // console.log(data)

    return <Row>
        <Col xs={4}>
            {/* <CardColumns> */}
                
            {data.books.map(book => (
                <Card
                    border="info"
                    text="info"
                    className={cx('form-control', 'text-center shadow')}
                    key={book.id}
                    onClick={setBookSelected.bind(this, book.id)}
                >
                    <Card.Body>{book.name}</Card.Body>
                </Card>
            ))}
            {/* </CardColumns> */}
        </Col>
        <Col>
            <BookDetails bookID={bookSelected} />
        </Col>
    </Row>;
}

export default BookList;