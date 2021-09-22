import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import shortid from 'shortid';
import ListView from '../listview/listview';
import TableView from '../tableview/tableview';
import Controller from '../controllers/controllers';
import Form from '../Form/Form';

class Todos extends React.Component {

    state = {
        todos: [
            {
                id: 1,
                text: 'test',
                description: 'description',
                time: new Date(),
                isComplete: false,
                isSelect: false
            },
            {
                id: 2,
                text: 'test2',
                description: 'description2',
                time: new Date(),
                isComplete: false,
                isSelect: false
            }
        ],
        isOpenTodoForm: false,
        searchTerm: '',
        view: 'list',
        filter: 'all'
    };

    toggleSelect = todoId => {
        const todos = [...this.state.todos]
        const todo = todos.find(todo => todo.id === todoId)

        todo.isSelect = !todo.isSelect
        this.setState({ todos })
    }

    toggleComplete = todoId => {
        const todos = [...this.state.todos]
        const todo = todos.find(todo => todo.id === todoId)

        todo.isComplete = !todo.isComplete
        this.setState({ todos })
    }

    toggleForm = () => {
        this.setState({
            isOpenTodoForm: !this.state.isOpenTodoForm
        })
    }

    handleSearch = (value) => { 
        this.setState({searchTerm: value})
    }

    createTodo = todo => {
        todo.id = shortid.generate()
        todo.time = new Date()
        todo.isComplete = false
        todo.isSelect = false

        const todos = [todo, ...this.state.todos]
        this.setState({ todos })
        this.toggleForm()
    };

    handleFilter = (filter) => {
        this.setState({filter})
     };

    changeView = (event) => {
        this.setState({
            view: event.target.value
        })
    };

    clearSelected = () => { 
        const todos = this.state.todos.filter(todo => !todo.isSelect)
        this.setState({todos})
    };

    clearCompleted = () => {
        const todos = this.state.todos.filter(todo => !todo.isComplete)
        this.setState({todos})
     };

    reset = () => {
        this.setState({
            filter: 'all',
            searchTerm: '',
            view: 'list',
            isOpenTodoForm: false
        })
     };

    performSearch = () => {
        return this.state.todos.filter(todo => todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    };

    performFilter = (todos) => {
        const {filter} = this.state
        if (filter === 'completed') {
            return todos.filter(todo => todo.isComplete)
        } else if (filter === 'running') {
            return todos.filter(todo => !todo.isComplete)
        } else {
            return todos
        }
    }

    getView = () => {
        let todos = this.performSearch();
        todos = this.performFilter(todos);

        return this.state.view === 'list' ? (
            <ListView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        ) : (
            <TableView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        )
    }

    render() {
        return (
            <div>
                <h3 className='display-4 text-center mb-5'>TO DO APP</h3>
                <Controller
                    term={this.state.searchTerm}
                    view={this.state.view}
                    toggleForm={this.toggleForm}
                    handleSearch={this.handleSearch}
                    handleFilter={this.handleFilter}
                    changeView={this.changeView}
                    clearSelected={this.clearSelected}
                    clearCompleted={this.clearCompleted}
                    reset={this.reset}

                />
                <div>
                    {this.getView()}
                </div>

                <Modal
                    isOpen={this.state.isOpenTodoForm}
                    toggle={this.toggleForm}
                >
                    <ModalHeader toggle={this.toggleForm}>
                        Create New Todo Item
                    </ModalHeader>
                    <ModalBody>
                        <Form createTodo={this.createTodo} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Todos;