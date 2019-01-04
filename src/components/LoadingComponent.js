import React from 'react';
import {Col} from "reactstrap"

export const Loading = () => {
    return (
        <Col sm='12'>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"/>
            <p>Loading . .</p>
        </Col>
    )
};