import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button, Modal, Header, Image } from 'semantic-ui-react';
import axios from 'axios';


export class FetchProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductData: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }


    state = { open: false }

    deleteShow = (deleteOn) => () => {
        this.setState({ deleteOn, open: true })
    }

    close = () => this.setState({ open: false })

    componentDidMount() {
        axios.get("https://localhost:44396/api/products").then(response => {
            console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
    }
    handleDelete(id) {
        fetch('https://localhost:44396/api/product/' + id, {
            method: 'delete'
        }).then(data => {
            this.setState(
                {
                    ProductData: this.state.ProductData.filter((rec) => {
                        return (rec.id != id);
                    })
                });
            this.close();
        });
    }

    render() {
        const { open, deleteOn } = this.state
        return (
            <div>
                <p> <a href="/addproduct"><Button primary> Create Product </Button> </a> </p>
                
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.ProductData.map((p) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{p.id} </Table.Cell>
                                    <Table.Cell>{p.productName}</Table.Cell>
                                    <Table.Cell>{p.price}</Table.Cell>
                                    <Table.Cell>
                                        <a onClick={(id) => this.handleDelete(p.id)}>
                                            <Button color='yellow' icon labelPosition='left'><Icon name='edit' />Edit</Button>
                                        </a>
                                    </Table.Cell>
                                    <Table.Cell>
                                            <div>
                                                <Button onClick={this.deleteShow()} color='red' icon labelPosition='left'> <Icon name='delete' />Delete</Button>
                                                <Modal
                                                    open={open}
                                                    deleteOn={deleteOn}
                                                    onClose={this.close}>

                                                    <Modal.Header>Delete Customer</Modal.Header>
                                                    <Modal.Content>
                                                        <p>Are you sure you?</p>
                                                    </Modal.Content>
                                                <Modal.Actions>
                                                    <Button onClick={this.close} negative> No </Button>
                                                    <Button
                                                        onClick={(id) => this.handleDelete(p.id)}
                                                        positive
                                                        labelPosition='right'
                                                        icon='checkmark'
                                                        content='Yes' />
                                                </Modal.Actions>
                                                </Modal>
                                            </div>
                                        
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>


                </Table>
            </div>
        );
    }
}