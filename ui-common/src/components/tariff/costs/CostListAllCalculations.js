import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css'
import '../../../styles/Tabble.css'
import {Button, Table} from "react-bootstrap";
import {useQuery} from "@apollo/client";
import {QUERY_LIST_ALL_CALCULATION, QUERY_START_PROCESSING} from "../../../Queries";

function CostListAllCalculations() {

    const listAllCalculation = useQuery(QUERY_LIST_ALL_CALCULATION);
    const startProcessing = useQuery(QUERY_START_PROCESSING);

    return (
        <div className={'main'}>
            <h1>Cost List All</h1>

            <Button variant="outline-success" onClick={event => {
                alert(startProcessing.data.query);
                window.location.reload();
            }} size="lg" block>
                Start Processing
            </Button><br/>

            <div id={'table'}>
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                    <tr>
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

        </div>
    );
}

export default withApollo(CostListAllCalculations)