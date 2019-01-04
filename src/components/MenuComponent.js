import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle, Col, Container, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from "./LoadingComponent";

function RenderMenuItem({dish}) {
    return (
        <Card>
            <Link to={`/confusion/menu/${dish.id}`}>
                <CardImg width="100%" src={ dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle className='text-black-50'>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <Col key={dish.id} md='6' className='mt-3 mb-3'>
                <RenderMenuItem dish={dish}/>
            </Col>
        );
    });
    if(props.dishes.isLoading) {
        return (
            <Container>
                <Row>
                    <Loading/>
                </Row>
            </Container>
        )
    }
    return (
        <Container>
            <Row>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/confusion/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <Col md={'12'}>
                    <h3>Menu</h3>
                    <hr/>
                </Col>
            </Row>
            <Row>
                {menu}
            </Row>
        </Container>
    );
};

export default Menu;