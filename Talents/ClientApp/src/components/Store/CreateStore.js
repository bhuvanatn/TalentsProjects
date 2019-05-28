import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class CreateStore extends Component {
    state = { open: false }

    modalShow = () => { this.setState({ open: true }) }

    close = () => this.setState({ open: false })

    addStore(newStore) {
        axios.request({
            method: 'post',
            url: 'https://localhost:44396/api/stores',
            data: newStore
        }).then(response => {
            console.log("createProd", response.data);
            this.props.history.push('/');
        }).catch(err => console.log(err));
        this.close();
        window.location.reload();
    }
    onSubmit(e) {
        const newStore = {
            storename: this.refs.storename.value,
            address: this.refs.address.value,
        }
        this.addStore(newStore);
        e.preventDefault();
    }
    render() {
        const { open } = this.state
        return (
            <div>
                <Button primary onClick={this.modalShow}> Create Store</Button>
                <Modal
                    open={open}
                    onClose={this.close}>

                    <Modal.Header>Create Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input type="text" name="storename" ref="storename" placeholder="Store Name" />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" name="address" ref="address" placeholder="Address" />
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