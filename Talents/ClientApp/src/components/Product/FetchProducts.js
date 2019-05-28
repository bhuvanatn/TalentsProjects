﻿import React, { Component } from 'react';
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
        });
    }

    render() {
        return (
            <div>
                <h2> Products List </h2>
                <p>
                    <a href="/addproduct"><Button primary> Create New </Button> </a>
                </p>

                <Modal trigger={<Button>Show Modal</Button>}>
                    <Modal.Header>Select a Photo</Modal.Header>
                    <Modal.Content image>
                        <Image
                            wrapped
                            size="medium"
                            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                        />
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>
                                We've found the following gravatar image associated with
                                your e-mail address.
        </p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>



                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
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
                                   
                                    <Table.Cell><a onClick={(id) => this.handleDelete(p.id)}><Button color='red' icon labelPosition='left'><Icon name='delete' />Delete</Button></a> </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>


                </Table>
            </div>
        );
    }
}