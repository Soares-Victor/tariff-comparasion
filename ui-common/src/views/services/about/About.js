import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import React from "react";

function About() {
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
                                <li>New dashboard of calculations</li>
                                <li>Upload calculations when starts the stack</li>
                                <li>Microservice - Log all requests</li>
                            </ul>
                            <h2>Coming soon</h2>
                            <ul>
                                <li>Chat</li>
                                <li>Edit information of current user</li>
                                <li>Save user preference settings</li>
                                <li>Summary about comparison</li>
                                <li>All Menus find by</li>
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
