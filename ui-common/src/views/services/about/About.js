import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import React from "react";

function About(props) {
    return(
        <div className="content">
            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <CardTitle tag="h4">About</CardTitle>
                            <p className="category">Last updates and coming soon</p>
                        </CardHeader>
                        <CardBody>
                            <h2>Last updates</h2>
                            <ul>
                                <li>New dashboard V2</li>
                            </ul>
                            <h2>Coming soon</h2>
                            <ul>
                                <li>New home page - Dashboard</li>
                                <li>Summary about comparison</li>
                                <li>New comparison by percentage</li>
                                <li>All Menus find by</li>
                                <li>All menus delete all</li>
                                <li>All stack deployed to cloud and CI/CD</li>
                            </ul>
                            <h3>Version</h3>
                            <p>1.1.0-SNAPSHOT</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default About;