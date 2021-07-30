import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css';
import '../../../styles/Tabble.css';
import '../../../styles/Alerts.css';
import {Alert, Button, Table} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import {MUTATION_DELETE_CALCULATIONS, QUERY_LIST_ALL_CALCULATION, QUERY_START_PROCESSING} from "../../../Queries";
import {useState} from "react";

function CostListAllCalculations() {

    const listAllCalculation = useQuery(QUERY_LIST_ALL_CALCULATION);
    const startProcessing = useQuery(QUERY_START_PROCESSING);
    const [mutationDeleteCalculations] = useMutation(MUTATION_DELETE_CALCULATIONS);
    const [alert, setAlert] = useState(false);

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
            .then(value => setAlert(value.data.deleteCalculations))
            .catch(reason => setAlert(reason.message));
    }

    return (
        <div className={'main'}>
            <h1>Cost List All</h1>

            <Button variant="outline-success" onClick={() => setAlert(startProcessing.data.query)} size="lg" block>
                Start Processing
            </Button><br/>

            <div id={'table'}>
                {alert &&
                    <div id={"hide"} onAnimationEnd={() => window.location.reload()}>
                        <Alert variant='primary'>{alert}</Alert>
                    </div>
                }
                <Table striped bordered hover size="sm" responsive>
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
            </div>

            <Button variant="outline-danger" onClick={deleteCalculations} size="sm" block>
                Delete files selected
            </Button>

        </div>
    );
}

export default withApollo(CostListAllCalculations)