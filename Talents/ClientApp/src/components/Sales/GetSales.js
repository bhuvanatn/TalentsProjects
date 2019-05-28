import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import { CreateSales } from './CreateSales';
import { DeleteSales } from './DeleteSales';
import { EditSales } from './EditSales';


export class GetSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SalesData: [],
            ProductsData: [],
            CustomersData: [],
            StoresData:[]
        }
    }
    componentDidMount() {
        axios.get("https://localhost:44396/api/sales").then(response => {
            //console.log("Sales", response.data);
            this.setState({
                SalesData: response.data
            });
        });
        axios.get("https://localhost:44396/api/products").then(response => {
           // console.log("Products", response.data);
            this.setState({
                ProductsData: response.data
            });
        });
        axios.get("https://localhost:44396/api/stores").then(response => {
           // console.log("Stores", response.data);
            this.setState({
                StoresData: response.data
            });
        });
        axios.get("https://localhost:44396/api/customers").then(response => {
           // console.log("Customers", response.data);
            this.setState({
                CustomersData: response.data
            });
        });
    }
    render() {
        return (
            <div>
                <CreateSales/>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>DateSold</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.SalesData.map((s) => {
                            return (
                                <Table.Row key={s.id}>
                                    <Table.Cell>{s.id} </Table.Cell>
                                    <Table.Cell> {s.dateSold} </Table.Cell>
                                    {this.state.ProductsData.map((p) => {
                                        if (s.productId === p.id) {
                                            return (<Table.Cell key={p.id}>{p.productName}</Table.Cell>)
                                        }
                                    })}
                                    {this.state.CustomersData.map((c) => {
                                        if (s.customerId === c.id) {
                                            return (<Table.Cell key={c.id}>{c.fullName}</Table.Cell>)
                                        }
                                    })} 
                                    {this.state.StoresData.map((st) => {
                                        if (s.storeId === st.id) {
                                            return (<Table.Cell key={st.id}>{st.storeName}</Table.Cell>)
                                        }
                                    })}
                                    <Table.Cell>
                                        <DeleteSales Delid={s.id} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <EditSales editId={s.id} dateSold={s.dateSold} productId={s.productId} customerId={s.customerId} storeId={s.storeId} />
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