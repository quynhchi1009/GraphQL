import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import styles from "./Form.module.scss"
import { useQuery, useMutation } from "@apollo/client";
import { getAuthors, getBooks } from "../graphql-client/queries";
import { addSingleBook } from "../graphql-client/mutations";

var classNames = require('classnames/bind');
var cx = classNames.bind(styles);

const BookForm = () => {
    const [newBook, setNewBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    })

    const {name, genre, authorId} = newBook

    const onInputChange = event => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        // console.log(newBook);
        addBook({
            variables: { name, genre, authorId },
            //display new saved data in Frontend
            refetchQueries: [{query: getBooks}]
        })
        setNewBook({name: '', genre: '', authorId: ''})
    }

    // GraphQL operations
    // eslint-disable-next-line no-unused-vars
    const { loading, error, data } = useQuery(getAuthors)
    
    const [addBook, dataMutation] = useMutation(addSingleBook)
    console.log(dataMutation); 

    return (  
        <div>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Control className={cx('form-control')} type="text" placeholder="Book name.." name="name" onChange={onInputChange} value={ name } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={cx('form-control')} type="text" placeholder="Book genre.." name="genre" onChange={onInputChange} value={ genre }/>
                    </Form.Group>
                    <Form.Group>
                        {loading ? <p>Loading Authors..</p> : 
                            <Form.Control
                                className={cx('form-control')}
                                as="select"
                                name="authorId"
                                onChange={onInputChange}
                                value={authorId}
                            >
                                <option value='' disabled> Select Author</option>
                                {data.authors.map(author =>
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                )}
                            </Form.Control>
                        }
                    </Form.Group>
                    <Button className='float-left' variant='outline-info' type='submit'>
                        Add Book
                    </Button>  
                </Form>
        </div>
    );
}

export default BookForm;