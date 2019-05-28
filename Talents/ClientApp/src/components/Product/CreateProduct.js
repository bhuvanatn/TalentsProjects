import React, { Component } from 'react';
import { Button, Modal} from 'semantic-ui-react';
import axios from 'axios';


export class CreateProduct extends Component {
    state = { open: false }

    modalShow = () => { this.setState({ open: true }) }

    close = () => this.setState({ open: false })

    addProduct(newProduct) {
        axios.request({
            method: 'post',
            url: 'https://localhost:44396/api/products',
            data: newProduct
        }).then(response => {
            console.log("createProd", response.data);
            this.props.history.push('/');
         }).catch(err => console.log(err));
        this.close();
        window.location.reload(); 
    }
    onSubmit(e) {
        const newProduct = {
            productname: this.refs.productname.value,
            price: this.refs.price.value,
        }
        this.addProduct(newProduct);
        e.preventDefault();
    }
    render() {
        const { open } = this.state
        return (
            <div>
                <Button primary onClick={this.modalShow}> Create Product</Button>
                <Modal
                    open={open}
                    onClose={this.close}>

                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Product Name</label>
                                <input type="text" name="productname" ref="productname" placeholder="Product Name" />
                            </div>
                            <div className="field">
                                <label>Price</label>
                                <input type="text" name="price" ref="price" placeholder="Price" />
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