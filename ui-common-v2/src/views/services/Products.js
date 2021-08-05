import {withApollo} from "@apollo/client/react/hoc";
import {Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import React from "react";

function Products(props) {
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <CardTitle tag="h4">Products</CardTitle>
                            <p className="category">Product Management</p>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead className="text-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th className="text-center">Salary</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Dakota Rice</td>
                                    <td>Niger</td>
                                    <td>Oud-Turnhout</td>
                                    <td className="text-center">$36,738</td>
                                </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default withApollo(Products);