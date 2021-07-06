import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css'
import '../../../styles/Tabble.css'
import {Button, FormControl, InputGroup, Table} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {MUTATION_CALCULATE_COSTS_YEAR} from "../../../Queries";
import {useState} from "react";

function CostCalculate() {

    let kwhYearUsed = 0;
    const [totalCosts, setTotalCosts] = useState(false);
    const[calculateCost] = useMutation(MUTATION_CALCULATE_COSTS_YEAR)

    return (
        <div className={'main'}>
            <h1>Cost Calculate</h1>
            <InputGroup className="mb-3">
                <FormControl type="number" ref={value => kwhYearUsed = value}
                    placeholder="Kwh Used Year"
                    aria-label="Kwh Used Year"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <InputGroup.Text>Kwh / Year</InputGroup.Text>
                    <Button onClick={event => {
                        event.preventDefault();
                        calculateCost({variables: {"calculateModel": {"kwhYear": parseFloat(kwhYearUsed.value)}}})
                            .then(data => {
                                setTotalCosts(data.data)
                            })
                            .catch(reason => {alert(reason)})
                    }} variant="success">Calculate</Button>
                </InputGroup.Append>
            </InputGroup>

            <div id={'table'}>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Base Costs Year</th>
                        <th>KWH Costs Year</th>
                        <th>Total Costs Year</th>
                    </tr>
                    </thead>
                    <tbody>
                    {totalCosts &&
                    totalCosts.calculateCostYear.products.map((value) =>
                        <tr key={value.name}>
                            <td key={value.name}>{value.name}</td>
                            <td key={value.totalYear.baseCostsYear}>{value.totalYear.baseCostsYear}</td>
                            <td key={value.totalYear.kwhCostsYear}>{value.totalYear.kwhCostsYear}</td>
                            <td key={value.totalYear.totalCosts}>{value.totalYear.totalCosts}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>

            </div>


        </div>
    );

}

export default withApollo(CostCalculate);