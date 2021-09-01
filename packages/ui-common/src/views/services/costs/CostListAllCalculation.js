import {withApollo} from "@apollo/client/react/hoc";
import NotificationAlert from "react-notification-alert";
import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import React from "react";
import {MUTATION_DELETE_CALCULATIONS, QUERY_LIST_ALL_CALCULATION, QUERY_START_PROCESSING} from "../../../queries";
import {useMutation, useQuery} from "@apollo/client";

function CostListAllCalculation() {

    const listAllCalculation = useQuery(QUERY_LIST_ALL_CALCULATION);
    const startProcessing = useQuery(QUERY_START_PROCESSING);
    const [mutationDeleteCalculations] = useMutation(MUTATION_DELETE_CALCULATIONS);

    const selectUnselectAllCalculations = (selected) => {
        let elementsByClassName = document.getElementsByClassName('ids-to-delete-calcs');
        for (let i = 0; i < elementsByClassName.length; i++) {
            elementsByClassName[i].checked = selected.checked;
        }
    }

    const deleteCalculations = () => {
        let idsToDelete = [];
        let elements = document.getElementsByClassName('ids-to-delete-calcs');
        for (let i = 0; i < elements.length; i++) {
            if (elements[i]["checked"]) idsToDelete.push(elements[i].id)
        }
        mutationDeleteCalculations({variables:{ids: idsToDelete}})
            .then(() => notify("Calculations Deleted!", "success"))
            .catch(reason => notify(reason.message, "danger"));
    }

    const notificationAlertRef = React.useRef(null);

    const notify = (message, type) => {
        notificationAlertRef.current.notificationAlert({
            place: "tc",
            message: (
                <div><div>{message}</div></div>
            ),
            type: !type ? "info" : type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
        });
    };

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <CardTitle tag="h4">Calculations</CardTitle>
                            <p className="category">List All Calculations</p>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead>
                                <tr>
                                    <th><input type="checkbox" onClick={event => {
                                        selectUnselectAllCalculations(event.target);
                                    }} /></th>
                                    <th>Id</th>
                                    <th>Processed Date</th>
                                    <th>Customer</th>
                                    <th>Product Name</th>
                                    <th>kwhYear Used</th>
                                    <th>Base Costs Year</th>
                                    <th>Kwh Costs Year</th>
                                    <th>Total Costs Year</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listAllCalculation.data &&
                                listAllCalculation.data.query.map((calculation) =>
                                    calculation.totalCosts.products.map((product) =>
                                        <tr>
                                            <td><input id={calculation._id} className="ids-to-delete-calcs" type="checkbox"/></td>
                                            <td>{calculation._id}</td>
                                            <td>{calculation.dateProcessed}</td>
                                            <td>{calculation.person.firstName} {calculation.person.lastName} - {calculation.installNumber}</td>
                                            <td>{product.name}</td>
                                            <td>{calculation.totalCosts.kwhYear}</td>
                                            <td>{product.totalYear.baseCostsYear}</td>
                                            <td>{product.totalYear.kwhCostsYear}</td>
                                            <td>{product.totalYear.totalCosts}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <CardFooter>
                                <Button
                                    className="btn-fill" color="primary"
                                    type="submit"
                                    onClick={() => {
                                        let query = startProcessing.data.query;
                                        notify(query.length > 0 ? "Processing Started!" : "No files to process", "success");
                                    }}>
                                    Start Processing
                                </Button>
                                <Button onClick={deleteCalculations} className="btn-fill" color="danger" type="submit">
                                    Delete Calculations Selected
                                </Button>
                            </CardFooter>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )

}

export default withApollo(CostListAllCalculation);