import React, { Component } from 'react';
import { Icon, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export class EditSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            customerId: '',
            productId: '',
            storeId: '',
            dateSold: '',

            SalesData: [],
            ProductsData: [],
            CustomersData: [],
            StoresData: []
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    state = { open: false }

    modalShow = () => { this.setState({ open: true }) }

    close = () => this.setState({ open: false })

    componentDidMount() {
        axios.get("https://localhost:44396/api/sales").then(response => {
            this.setState({
                SalesData: response.data
            });
        });
        axios.get("https://localhost:44396/api/products").then(response => {
            this.setState({
                ProductsData: response.data
            });
        });
        axios.get("https://localhost:44396/api/stores").then(response => {
            this.setState({
                StoresData: response.data
            });
        });
        axios.get("https://localhost:44396/api/customers").then(response => {
            this.setState({
                CustomersData: response.data
            });
        });
    }
    onSubmit(e) {
        const editStore = {
            id: this.props.editId,
            productId: this.props.productId,
            customerId: this.props.customerId,
            storeId: this.props.storeId,
            dateSold: this.props.dateSold
        }
        this.handleEdit(editStore);
        e.preventDefault();
    }

    handleEdit(editStore) {
        console.log("I editproduct", this.props.editId, this.props.editName);
        axios.request({
            method: 'put',
            url: `https://localhost:44396/api/sales/${ this.props.editId}`,
            data: editStore
        }).then(response => {
            this.setState({
                id: this.props.editId,
                productId: this.refs.productId.value,
                customerId: this.refs.customerId.value,
                storeId: this.refs.storeId.value,
                dateSold: this.refs.dateSold.value
            }, () => {
                console.log("handleEdit responseofput", this.state);
            });
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }


    handleInputChange(e) {
        console.log("handleChangeevent dfd", e.target, e.target.value);
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { open } = this.state
        return (
            <div>
                <Button onClick={this.modalShow} color='yellow' icon labelPosition='left'> <Icon name='edit' />Edit</Button>
                <Modal
                    open={open}
                    onClose={this.close}>

                    <Modal.Header>Edit Store</Modal.Header>
                    <Modal.Content>
                        <p>Create Sales Item</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Date Sold</label>
                                <input type="text" name="dateSold" ref="dateSold" defaultValue={this.props.dateSold} placeholder="DateSold" />
                            </div>
                            <div className="field">
                                <label>Customer</label>
                                <select name="customerId" ref="customerId">
                                    {this.state.CustomersData.map((c) => <option key={c.id} defaultValue={this.props.customerId}>{c.fullName}</option>)}
                                </select>
                            </div>
                            <div className="field">
                                <label>Product</label>
                                <select name="productId" ref="productId">
                                    {this.state.ProductsData.map((p) => <option key={p.id} defaultValue={this.props.productId}>{p.productName}</option>)}
                                </select>
                            </div>
                            <div className="field">
                                <label>Store</label>
                                <select name="storeId" ref="storeId">
                                    {this.state.StoresData.map((st) => <option key={st.id} defaultValue={this.props.storeId}>{st.storeName}</option>)}
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