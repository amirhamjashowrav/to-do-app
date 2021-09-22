import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import PropTypes from 'prop-types';

class CreateForm extends React.Component {
    state = {
        text: '',
        description: ''
    }

    handleChange = event => {
        this.setState ({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.createTodo(this.state)
        //event.target.reset()
        this.setState({text: '', description: ''})
    }

    render(){
        return(
            <Form>
                <FormGroup>
                    <Label>Enter Task</Label>
                    <Input 
                        placeholder = 'task'
                        name = 'text'
                        value = {this.state.text}
                        onChange = {this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input 
                        type = 'textarea'
                        placeholder = 'write something about your task'
                        name = 'description'
                        value = {this.state.description}
                        onChange = {this.handleChange}
                    />
                </FormGroup>
                <Button type = 'submit' onClick = {this.handleSubmit}>Add Task</Button>
            </Form>
        )
    }
}

CreateForm.propTypes = {
    createTodo: PropTypes.func.isRequired
}

export default CreateForm;