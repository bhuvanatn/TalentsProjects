﻿import React, { Component } from 'react';
import { Icon, Table, Button, Modal, Header, Image } from 'semantic-ui-react';
import axios from 'axios';
import { CreatCustomer } from './CreateCustomer';
import { DeleteCustomer } from './DeleteCustomer';
import { EditCustomer } from './EditCustomer';


export class GetCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerData: []
        }
    }
    componentDidMount() {
        axios.get("https://localhost:44396/api/customers").then(response => {
            console.log(response.data);
            this.setState({
                CustomerData: response.data
            });
        });
    }

    render() {
        return (
            <div>
                    <CreatCustomer/>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>FullName</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.CustomerData.map((c) => {
                            return (
                                <Table.Row key={c.id}>
                                    <Table.Cell>{c.id} </Table.Cell>
                                    <Table.Cell>{c.fullName}</Table.Cell>
                                    <Table.Cell>{c.address}</Table.Cell>
                                     <Table.Cell>
                                        <DeleteCustomer Delid={c.id} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <EditCustomer editId={c.id} editName={c.fullName} editAddress={c.address} />
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
                                    