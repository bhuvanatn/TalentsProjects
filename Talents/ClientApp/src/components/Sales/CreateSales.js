import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class CreateSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductsData: [],
            CustomersData: [],
            StoresData: [],
            SalesData: []
        }
    }
    state = { open: false }

    modalShow = () => { this.setState({ open: true }) }

    close = () => this.setState({ open: false })

    componentDidMount() {
        axios.get("https://localhost:44396/api/sales").then(response => {
           // console.log("Sales", response.data);
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
            //console.log("Stores", response.data);
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
   
    addSales(newSales) {
        axios.request({
            method: 'post',
            url: 'https://localhost:44396/api/sales',
            data: newSales
        }).then(response => {
           // console.log("create Sales", response.data);
            this.props.history.push('/');
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }
    onSubmit(e) {
        const newSales = {
            datesold: this.refs.datesold.value,
            customerId: this.refs.customerId.value,
            productId: this.refs.productId.value,
            storeId: this.refs.storeId.value
        }
        console.log("newSales:", newSales);
        this.addSales(newSales);
        e.preventDefault();
    }
    render() {
        const { open } = this.state
        return (
            <div>
                <Button primary onClick={this.modalShow}> Create Sales</Button>
                <Modal
                    open={open}
                    onClose={this.close}>
                    <Modal.Header>Create Sales</Modal.Header>
                    <Modal.Content>
                        <p>Create Sales Item</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Date Sold</label>
                                <input type="text" name="datesold" ref="datesold" placeholder="DateSold" />
                            </div>
                            <div className="field">
                                <label>Customer</label>
                                <select name="customerId" ref="customerId">
                                    {this.state.CustomersData.map((c) => <option key={c.id} value={c.id}>{c.fullName}</option>)}
                                </select>
                            </div>
                            <div className="field">
                                <label>Product</label>
                                <select name="productId" ref="productId">
                                    {this.state.ProductsData.map((p) => <option key={p.id} value={p.id}>{p.productName}</option>)}
                                </select>
                            </div>
                            <div className="field">
                                <label>Store</label>
                                <select name="storeId" ref="storeId">
                                    {this.state.StoresData.map((st) => <option key={st.id} value={st.id}>{st.storeName}</option>)}
                                </select>
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> No </Button>
                        <Button
                            onClick={this.onSubmit.bind(this)}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes' />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}