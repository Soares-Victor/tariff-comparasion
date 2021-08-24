import {withApollo} from "@apollo/client/react/hoc";
import NotificationAlert from "react-notification-alert";
import React from "react";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row, Table} from "reactstrap";
import {QUERY_CALCULATE_COSTS_YEAR} from "../../../queries";
import {useLazyQuery} from "@apollo/client";

function CostCalculate() {

    let kwhYearUsed = 0;
    const [calculateCost, {data}] = useLazyQuery(QUERY_CALCULATE_COSTS_YEAR)

    const notificationAlertRef = React.useRef(null);

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <CardTitle tag="h4">Calculate</CardTitle>
                            <p className="category">Costs Calculate</p>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="2">
                                        <FormGroup>
                                            <Input
                                                onChange={event => kwhYearUsed = event.target}
                                                placeholder="4500"
                                                type="number"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                            <Button
                                className="btn-fill" color="primary"
                                type="submit"
                                onClick={event => {
                                    event.preventDefault();
                                    calculateCost({variables: {"kwhYear": kwhYearUsed.value.toString()}});
                                }}>
                                Calculate
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <h5 className="title">Calculations</h5>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product Description</th>
                                    <th>Charger</th>
                                    <th>Base Costs Year</th>
                                    <th>KWH Costs Year</th>
                                    <th>Total Costs Year</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data &&
                                    data.calculateCostYear.products.map((value) =>
                                        <tr key={value.name}>
                                            <td key={value.name}>{value.name}</td>
                                            <td key={value.description}>{value.description}</td>
                                            <td key={value.charger}>{value.charger}</td>
                                            <td key={value.totalYear.baseCostsYear}>{value.totalYear.baseCostsYear}</td>
                                            <td key={value.totalYear.kwhCostsYear}>{value.totalYear.kwhCostsYear}</td>
                                            <td key={value.totalYear.totalCosts}>{value.totalYear.totalCosts}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
export default withApollo(CostCalculate);