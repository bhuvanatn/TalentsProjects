import React, { Component } from 'react';
import { Icon, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export class EditStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            storeame: '',
            address: ''
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    state = { open: false }

    modalShow = () => { this.setState({ open: true }) }

    close = () => this.setState({ open: false })


    onSubmit(e) {
        const editStore = {
            id: this.props.editId,
            storename: this.refs.storename.value,
            address: this.refs.address.value
        }
        this.handleEdit(editStore);
        e.preventDefault();
    }

    handleEdit(editStore) {
        axios.request({
            method: 'put',
            url: `https://localhost:44396/api/stores/${this.props.editId}`,
            data: editStore
        }).then(response => {
            this.setState({
                id: response.data.id,
                storename: this.refs.storename.value,
                address: this.refs.address.value
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
                        <p>Are you sure you?</p>
                        <div className="ui form">
                            <div className="field">
                                <label>Name</label>
                                <input type="text" name="storename" ref="storename" placeholder="Store Name" defaultValue={this.props.storeName} onChange={this.handleInputChange} />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" name="address" ref="address" placeholder="Address" defaultValue={this.props.storeAddress} onChange={this.handleInputChange} />
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