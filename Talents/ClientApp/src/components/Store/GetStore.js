import React, { Component } from 'react';
import { Icon, Table, Button, Modal, Header, Image } from 'semantic-ui-react';
import axios from 'axios';
import { CreateStore } from './CreateStore';
import { DeleteStore } from './DeleteStore';
import { EditStore } from './EditStore';


export class GetStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreData: []
        }
    }
    componentDidMount() {
        axios.get("https://localhost:44396/api/stores").then(response => {
            console.log(response.data);
            this.setState({
                StoreData: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <CreateStore />
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
                        {this.state.StoreData.map((st) => {
                            return (
                                <Table.Row key={st.id}>
                                    <Table.Cell>{st.id} </Table.Cell>
                                    <Table.Cell>{st.storeName}</Table.Cell>
                                    <Table.Cell>{st.address}</Table.Cell>
                                    <Table.Cell>
                                        <DeleteStore Delid={st.id} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <EditStore editId={st.id} storeName={st.storeName} storeAddress={st.address} />
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
