import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row} from 'reactstrap';
import {Loading} from "./LoadingComponent";
import {FadeTransform} from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return (
            <Loading/>
        )
    } else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    } else {
        return (
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg src={item.image } alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation} </CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    }

}

const Home = (props) => {
    return (
        <Container>
            <Row className='align-items-start'>
                <Col className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                                isLoading={props.dishesLoading}
                                errMess={props.dishErrMess}
                    />
                </Col>
                <Col className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                                isLoading={props.promoLoading}
                                errMess={props.promoErrMess}
                    />

                </Col>
                <Col className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                                isLoading={props.leaderLoading}
                                errMess={props.leaderErrMess}
                    />
                </Col>
            </Row>
        </Container>
    )
};

export default Home;