import React, {Component} from 'react';
import {
    Col,
    Collapse,
    Container,
    Jumbotron,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    Row,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormGroup, Label, Input
} from 'reactstrap';

import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event) {
        this.toggleModal();
        alert(
            'Username ' + this.username.value +
            ' Password ' + this.password.value +
            ' Remember ' + this.remember.checked
        );
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand={'md'}>
                    <Container>
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className={'mr-auto'} href="/">
                            <img src={'assets/images/logo.png'} height={'30'} width={'41'}
                                 alt={"Ristorante Con Fusion"}/>
                        </NavbarBrand>
                        <Collapse navbar isOpen={this.state.isNavOpen}>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className={"nav-link"} to={"/confusion/home"}>
                                        <i className="fa fa-home fa-lg"/> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={"nav-link"} to={"/confusion/aboutus"}>
                                        <i className="fa fa-info fa-lg"/> About us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={"nav-link"} to={"/confusion/menu"}>
                                        <i className="fa fa-list fa-lg"/> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={"nav-link"} to={"/confusion/contactus"}>
                                        <i className="fa fa-address-card fa-lg"/> Contact us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className='fa fa-sign-in fa-lg'/> Login
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                <Jumbotron>
                    <Container>
                        <Row className={'row-header'}>
                            <Col sm={'6'} md={12}>
                                <h1>Restorante Con Fusion</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, aliquid at
                                    consectetur cumque ea enim eos harum illum in itaque maxime mollitia nihil, omnis
                                    quas repellendus sit soluta voluptate. Minima.</p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor='username'>Username</Label>
                                <Input type='text' id='username' name='username'
                                       innerRef={(input) => this.username = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input type='password' id='password' name='password'
                                       innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id='remember' name='remember'
                                           innerRef={(input) => this.remember = input}/>
                                    Remember me
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type='submit' value='submit'>Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;
