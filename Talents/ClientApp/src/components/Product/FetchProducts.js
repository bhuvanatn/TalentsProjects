import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { DeleteProduct } from './DeleteProduct';
import { EditProduct } from './EditProduct';
import { CreateProduct } from './CreateProduct';


export class FetchProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductData: []
        }
    }

    componentDidMount() {
        axios.get("https://localhost:44396/api/products").then(response => {
            console.log(response.data);
            this.setState({
                ProductData: response.data
            });
        });
    }
   

    render() {
        return (
            <div>
                <CreateProduct />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.ProductData.map((p) => {
                            return (
                                <Table.Row key={p.id}>
                                    
                                    <Table.Cell>{p.id} </Table.Cell>
                                    <Table.Cell>{p.productName}</Table.Cell>
                                    <Table.Cell>{p.price}</Table.Cell>
                                    <Table.Cell>
                                        <DeleteProduct Delid={p.id} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <EditProduct editId={p.id} editName={p.productName} editPrice={p.price} />
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