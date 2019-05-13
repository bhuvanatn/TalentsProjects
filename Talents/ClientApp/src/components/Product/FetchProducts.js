import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
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
                    <a href="/addproduct"> Create New </a>
                </p>

                <div>
                    <Button icon labelPosition='left'>
                        <Icon name='pause' />
                        Pause
    </Button>
                    <Button icon labelPosition='right'>
                        Next
      <Icon name='right arrow' />
                    </Button>
                </div>

                <Button color='red'>Red</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Buttons</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.ProductData.map((p) => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{p.id} </Table.Cell>
                                    <Table.Cell>{p.productName}</Table.Cell>
                                    <Table.Cell>{p.price}</Table.Cell>
                                    <Button color='red'>Red</Button>
                                    <Table.Cell><a onClick={(id) => this.handleDelete(p.id)}>Delete</a> </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>


                </Table>
            </div>
        );
    }
}