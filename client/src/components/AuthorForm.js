import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import styles from "./Form.module.scss"
import { useMutation } from "@apollo/client";
import { getAuthors } from "../graphql-client/queries";
import { addSingleAuthor } from "../graphql-client/mutations";

var classNames = require('classnames/bind');
var cx = classNames.bind(styles);

function AuthorForm() {
    const [newAuthor, setNewAuthor] = useState({
        name: '',
        age: '',
    })

    const {name, age} = newAuthor

    const onInputChange = event => {
        setNewAuthor({
            ...newAuthor,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = event => {
        event.preventDefault();
        // console.log(newBook);
        addAuthor({
            variables: { name, age:parseInt(age) },
            //display new saved data in Frontend
            refetchQueries: [{query: getAuthors}]
        })
        setNewAuthor({name: '', age: ''})
    }

    // GraphQL operations    
    const [addAuthor, dataMutation] = useMutation(addSingleAuthor)
    console.log(dataMutation); 

    return ( 
        <div>
            <Form onSubmit={onSubmit}>
                    <Form.Group className={cx('form-control', "invisible")}>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={cx('form-control')} type="text" placeholder="Author name.." name='name' onChange={onInputChange} value={name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control className={cx('form-control')} type="number" placeholder="Author age.." name='age' onChange={onInputChange} value={age}/>
                    </Form.Group>
                    <Button className='float-right' variant='outline-info' type='submit'>
                        Add Author
                    </Button> 
                </Form>
        </div>
     );
}

export default AuthorForm;