import React, {Component} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Container,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, Errors, LocalForm} from 'react-redux-form';
import {Loading} from "./LoadingComponent";
import {Fade, FadeTransform, Stagger} from 'react-animation-components'

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
        this.toggleModal();
        console.log(values);
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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

const RenderComments = ({comments, postComment, dishId}) => {
    if (comments != null) {
        return (
            <Col className='col-12 col-md-5 m-1'>
                <h3>Comments</h3>
                <Stagger in>
                    {comments.map((comment) => {
                        return (
                            <Fade in key={comment.id}>
                                <blockquote className="blockquote" >
                                    <p className="mb-0">{comment.comment}</p>
                                    <footer className="blockquote-footer">
                                        <cite title="{comment.author}">{comment.author}</cite>, {' '}
                                        {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: '2-digit'
                                        }).format(new Date(Date.parse(comment.date)))}
                                    </footer>
                                </blockquote>
                            </Fade>
                        );
                    })}
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </Stagger>
            </Col>
        );
    } else {
        return (<div/>)
    }
};

const RenderDish = ({dish}) => {

    if (dish != null) {
        return (
            <Col className='col-12 col-md-5 m-1'>
                <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                        <Card>Base
                            <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle className={'text-primary'}>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                </FadeTransform>
            </Col>
        );
    } else {
        return (<div/>)
    }
};

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <Container>
                <Row>
                    <Loading/>
                </Row>
            </Container>
        )
    } else if (props.errMess) {
        return (
            <Container>
                <Row>
                    <h4>{props.errMess}</h4>
                </Row>
            </Container>
        )
    } else if (props.dish != null) {
        return (
            <Container className={"mb-5"}>
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <Col md={'12'}>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}
                    />
                </Row>
            </Container>
        )
    } else {
        return (<div/>)
    }
};


export default DishDetail