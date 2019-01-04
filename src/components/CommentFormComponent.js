import React, {Component} from 'react';
import {Col, Row, Button, Modal, ModalBody, ModalHeader, Label} from 'reactstrap';

import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        console.log(JSON.stringify(values));
        alert(JSON.stringify(values));
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg"/> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Col sm={12}>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label>Rating</Label>
                                    <Control.select model='.rating' type='select' name='rating' defaultValue='1'
                                                    className='form-control'>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='author'>Your name</Label>
                                    <Control.text type="text" model=".author" id="author" name="author"
                                                  placeholder="Your name" className='form-control'
                                                  validators={{
                                                      required,
                                                      maxLength: maxLength(15),
                                                      minLength: minLength(3)
                                                  }}
                                    />
                                    <Errors className="text-danger" model='.author' show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: "Must be greater that 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                    >

                                    </Errors>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment'>Comment</Label>
                                    <Control.textarea type='textarea' model='.comment' id='comment' name='comment'
                                                      rows='6' className='form-control'
                                    />
                                </Row>
                                <Row className='form-group'>
                                    <Button type='submit' color='primary'>
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                        </Col>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;