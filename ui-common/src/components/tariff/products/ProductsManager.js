import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css';
import '../../../styles/Tabble.css';
import '../../../styles/Alerts.css';
import {Alert, Button, FormControl, InputGroup, Modal, Table} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import {
    MUTATION_CREATE_PRODUCT,
    MUTATION_DELETE_PRODUCT,
    MUTATION_UPDATE_PRODUCT,
    QUERY_LIST_ALL_PRODUCT
} from "../../../Queries";
import {Label} from "reactstrap";
import {useState} from "react";
import {AiOutlineEdit, CgRemove, GiConfirmed} from "react-icons/all";

function ProductsManager() {

    const listAllProducts = useQuery(QUERY_LIST_ALL_PRODUCT);
    const [update] = useMutation(MUTATION_UPDATE_PRODUCT);
    const [save] = useMutation(MUTATION_CREATE_PRODUCT);
    const [deleteProduct] = useMutation(MUTATION_DELETE_PRODUCT);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [alert, setAlert] = useState(false);

    const [id, setId] = useState("");
    const [tariffName, setTariffName] = useState("");
    const [description, setDescription] = useState("");
    const [maxConsumption, setMaxConsumption] = useState("");
    const [baseCost, setBaseCost] = useState("");
    const [costKwh, setCostKwh] = useState("");
    const [monthYear, setMonthYear] = useState("");

    const cleanFields = () => {
        setId("")
        setTariffName("");
        setDescription("");
        setMonthYear("");
        setMaxConsumption("")
        setBaseCost("");
        setCostKwh("");
    }

    const saveProduct = () => {
        let product = {
            tariffName: tariffName,
            description: description,
            month: monthYear === 'month',
            values: {
                baseCost: parseFloat(baseCost),
                kwhCost: parseFloat(costKwh),
                maxConsumption: maxConsumption ? (parseInt(maxConsumption) > 0 ? parseInt(maxConsumption) : null) : null
            }
        }
        if (!id) {
            save({variables: {productModel: product}})
                .then(value => {
                    setAlert(value.data.createOneProduct)
                    handleClose();
                })
                .catch(reason => setAlert(reason.message));
        }
        else {
            update({variables: {id: id, productModel: product}})
                .then(value => {
                    setAlert(value.data.updateOneProduct)
                    handleClose();
                })
                .catch(reason => setAlert(reason.message))
        }
    }

    const deleteOne = (id) => {
        if (window.confirm("Do you want to delete the product id: \n" + id + "\n?")){
            deleteProduct({variables: {id: id}})
                .then(value => setAlert(value.data.deleteOneProduct))
                .catch(reason => setAlert(reason.message))
                .finally(() => handleClose())
        }
    }

    return (
        <div className={'main'}>
            <h1>Management All Products</h1>

            <Button variant="outline-success" onClick={() => {
                cleanFields();
                handleShow();
            }} size="lg" block>
                Create new Product
            </Button><br/>
                <div id={'table'}>
                    {alert &&
                        <div id={"hide"} onAnimationEnd={() => window.location.reload()}>
                            <Alert variant='primary'>{alert}</Alert>
                        </div>
                    }
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Tariff Name</th>
                            <th>Description</th>
                            <th>Month</th>
                            <th>Base Cost</th>
                            <th>KWH Cost</th>
                            <th>Max Consumption</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listAllProducts.data &&
                        listAllProducts.data.query.map((product) =>
                            <tr>
                                <th>{product._id}</th>
                                <th>{product.tariffName}</th>
                                <th>{product.description}</th>
                                <th>{product.month && <GiConfirmed color="green" size={20}/>}</th>
                                <th>{product.values.baseCost}</th>
                                <th>{product.values.kwhCost}</th>
                                <th>{product.values.maxConsumption}</th>
                                <th>
                                    <a href="#" onClick={() => {
                                        cleanFields();
                                        setId(product._id)
                                        setTariffName(product.tariffName);
                                        setDescription(product.description);
                                        setMonthYear(product.month ? 'month' : 'year')
                                        setBaseCost(product.values.baseCost);
                                        setCostKwh(product.values.kwhCost);
                                        setMaxConsumption(product.values.maxConsumption)
                                        handleShow();
                                    }}><AiOutlineEdit color="darktblue" size={25}/>
                                    </a>
                                </th>
                                <th>
                                    <a href="#" onClick={() => {
                                            deleteOne(product._id);
                                        }}><CgRemove color="red" size={25}/>
                                    </a>
                                </th>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {id &&
                        <InputGroup className="mb-3">
                            <FormControl value={id} disabled={true} id="id" aria-describedby="basic-addon3" />
                        </InputGroup>
                    }
                    <InputGroup className="mb-3">
                        <FormControl placeholder="Tariff Name" onChange={event => setTariffName(event.target.value)} value={tariffName} id="tariff-name" aria-describedby="basic-addon3" />
                        <FormControl placeholder="Description Tariff" onChange={event => setDescription(event.target.value)} value={description} id="description" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <label htmlFor={"radio-month"}>Month</label>
                        <input type={"radio"} id={"radio-month"} style={{ margin: '5px 5px 0px 5px'}} name="package" onClick={() => setMonthYear("month")} checked={monthYear === 'month'} />
                        <label htmlFor={"radio-year"}>Annual</label>
                        <input type={"radio"} id={"radio-year"} style={{ margin: '5px 5px 0px 5px'}} name="package" onClick={() => setMonthYear("year")} checked={monthYear !== 'month'}/>
                    </InputGroup>

                    <Label htmlFor="base-cost">Base Cost</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: 5.0
                        </InputGroup.Text>
                        <FormControl type="number" onChange={event => setBaseCost(event.target.value)} value={baseCost} id="base-cost" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <Label htmlFor="cost-kwh">Base Cost Per Kwh</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: 0.78
                        </InputGroup.Text>
                        <FormControl type="number" onChange={event => setCostKwh(event.target.value)} value={costKwh} id="cost-kwh" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <Label htmlFor="max-consumption">Max Consumption</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: 4000
                        </InputGroup.Text>
                        <FormControl type="number" onChange={event => setMaxConsumption(event.target.value)} value={maxConsumption} id="cost-kwh" aria-describedby="basic-addon3" />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveProduct}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default withApollo(ProductsManager)