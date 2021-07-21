import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css';
import '../../../styles/Tabble.css'
import {Button, FormControl, InputGroup, Modal, Table} from "react-bootstrap";
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
                    alert(value.data.createOneProduct)
                    window.location.reload();
                    handleClose();
                })
                .catch(reason => {
                    alert(reason)
                });
        }
        else {
            update({variables: {id: id, productModel: product}})
                .then(value => {
                    alert(value.data.updateOneProduct)
                    window.location.reload();
                    handleClose();
                })
                .catch(reason => {
                    alert(reason)
                })
        }
    }

    const deleteOne = (id) => {
        if (window.confirm("Do you want to delete the product id: \n" + id + "\n?")){
            deleteProduct({variables: {id: id}})
                .then(value => {
                    alert(value.data.deleteOneProduct)
                })
                .catch(reason => {
                    alert(reason)
                })
                .finally(() => {
                    window.location.reload();
                    handleClose();
                })
        }
    }

    return (
        <div className={'main'}>
            <h1>Management All Products</h1>

            <Button variant="outline-success" onClick={event => {
                cleanFields();
                handleShow();
            }} size="lg" block>
                Create new Product
            </Button><br/>
                <div id={'table'}>
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
                                    <a href="#" onClick={event => {
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
                                    <a href="#" onClick={event => {
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

                    <Label htmlFor="id">ID</Label>
                    <InputGroup className="mb-3">
                        <FormControl value={id} disabled={true} id="id" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <Label htmlFor="tariff-name">Tariff Name</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: Packaged Annual
                        </InputGroup.Text>
                        <FormControl onChange={event => setTariffName(event.target.value)} value={tariffName} id="tariff-name" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <Label htmlFor="description">Description</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: Packaged Annual tariff
                        </InputGroup.Text>
                        <FormControl onChange={event => setDescription(event.target.value)} value={description} id="description" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <InputGroup className="mb-3">

                        <InputGroup.Text id="basic-addon3">Month</InputGroup.Text>
                        <InputGroup.Radio name="package" onClick={() => setMonthYear("month")} checked={monthYear === 'month'}  />

                        <InputGroup.Text id="basic-addon3">Annual</InputGroup.Text>
                        <InputGroup.Radio name="package" onClick={() => setMonthYear("year")} checked={monthYear !== 'month'}/>

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