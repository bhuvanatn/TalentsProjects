import React, { Component } from 'react';
import { Icon, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export class DeleteStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreData: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    state = { open: false }

    modalShow = () => { this.setState({ open: true }) }

    close = () => this.setState({ open: false })

    handleDelete(id) {
        axios.delete('https://localhost:44396/api/stores/' + this.props.Delid)
            .then(data => {
                this.setState(
                    {
                        StoreData: this.state.StoreData.filter((rec) => {
                            return (rec.id !== id);
                        })
                    });
            })
            .catch(err => {
                console.log("Axios Del", err);
            });
        this.close();
        window.location.reload();
    }

    render() {
        const { open } = this.state
        return (
            <div>
                <Button onClick={this.modalShow} color='red' icon labelPosition='left'> <Icon name='delete' />Delete</Button>
                <Modal
                    open={open}
                    onClose={this.close}>

                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative> No </Button>
                        <Button
                            onClick={(id) => this.handleDelete(this.props.Delid)}
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