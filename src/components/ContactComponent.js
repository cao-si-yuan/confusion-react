import React, {Component} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Label,
    Row
} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, Form, Errors} from 'react-redux-form';

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(JSON.stringify(values));
        this.props.postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message);
        this.props.resetFeedbackForm();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact us</BreadcrumbItem>
                    </Breadcrumb>
                    <Col md={'12'}>
                        <h3>Contact us</h3>
                        <hr/>
                    </Col>
                </Row>
                <Row className="row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br/>
                            Clear Water Bay, Kowloon<br/>
                            HONG KONG<br/>
                            <i className={"fa fa-phone"}/>: +852 1234 5678<br/>
                            <i className={"fa fa-fax"}/>: +852 8765 4321<br/>
                            <i className={"fa fa-envelope"}/>: <a
                            href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i
                                className="fa fa-phone"/> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"/> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i
                                className="fa fa-envelope-o"/> Email</a>
                        </div>
                    </div>
                </Row>
                <Row className="row-content">
                    <Col sm={12}>
                        <h3>Send us your feedback</h3>
                    </Col>
                    <Col sm={12} md={9}>
                        <Form model='feedback' onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text type="text" model=".firstname" id="firstname" name="firstname"
                                                  placeholder="First Name" className='form-control'
                                                  validators={{
                                                      required,
                                                      maxLength: maxLength(15),
                                                      minLength: minLength(3)
                                                  }}
                                    />
                                    <Errors className="text-danger" model='.firstname' show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: "Must be greater that 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                    >

                                    </Errors>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text type="text" model=".lastname" id="lastname" name="lastname"
                                                  placeholder='Last Name' className='form-control'
                                                  validators={{
                                                      required,
                                                      maxLength: maxLength(15),
                                                      minLength: minLength(3)
                                                  }}
                                    />
                                    <Errors className="text-danger" model='.lastname' show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: "Must be greater that 2 characters",
                                                maxLength: "Must be 15 characters or less"
                                            }}
                                    >

                                    </Errors>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text type="tel" model=".telnum" id="telnum" name="telnum"
                                                  placeholder="Tel. Number" className='form-control'
                                                  validators={{
                                                      required,
                                                      maxLength: maxLength(15),
                                                      minLength: minLength(3),
                                                      isNumber
                                                  }}
                                    />
                                    <Errors className="text-danger" model='.telnum' show='touched'
                                            messages={{
                                                required: 'Required',
                                                minLength: "Must be greater that 2 number",
                                                maxLength: "Must be 15 number or less",
                                                isNumber: 'Must be a number'
                                            }}
                                    >

                                    </Errors>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text type="email" model=".email" id="email" name="email"
                                                  placeholder="Email" className='form-control'
                                                  validators={{
                                                      required,
                                                      validEmail
                                                  }}

                                    />
                                    <Errors className="text-danger" model='.email' show='touched'
                                            messages={{
                                                required: 'Required',
                                                validEmail: 'Invalid email address'
                                            }}
                                    > </Errors>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox type='checkbox'
                                                              model='.agree' name='agree' className='form-check-input'/>
                                            {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model='.contactType' type='select'
                                                    name='contactType' className='form-control'>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='message' md={2}>Your feedback</Label>
                                <Col md={10}>
                                    <Control.textarea type='textarea' model='.message' id='message' name='message'
                                                      rows='12' className='form-control'

                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type='submit' color='primary'>
                                        Send feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Contact;