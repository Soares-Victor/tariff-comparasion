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
    const [baseCostMonth, setBaseCostMonth] = useState("");
    const [baseCostKwh, setBaseCostKwh] = useState("");
    const [rule, setRule] = useState("");

    const cleanFields = () => {
        setId("")
        setTariffName("");
        setBaseCostMonth("");
        setBaseCostKwh("");
        setRule("");
    }

    const saveProduct = () => {
        let product = {
            tariffName: tariffName,
            baseCostMonth: parseFloat(baseCostMonth),
            costKwh: parseFloat(baseCostKwh),
            rule: rule
        }
        if (!id) {
            save({variables: {productModel: product}})
                .then(value => {
                    alert(value.data.createOneProduct)
                })
                .catch(reason => {
                    alert(reason)
                })
                .finally(() => {
                    window.location.reload();
                    handleClose();
                })
        }
        else {
            update({variables: {id: id, productModel: product}})
                .then(value => {
                    alert(value.data.updateOneProduct)
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
                            <th>Base Cost Month</th>
                            <th>Cost KWH</th>
                            <th>Rule</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listAllProducts.data &&
                        listAllProducts.data.query.map((product) =>
                            <tr>
                                <th>{product._id}</th>
                                <th>{product.tariffName}</th>
                                <th>{product.baseCostMonth}</th>
                                <th>{product.costKwh}</th>
                                <th>{product.rule}</th>
                                <th>
                                    <Button variant="outline-info" onClick={event => {
                                        cleanFields();
                                        setId(product._id);
                                        setTariffName(product.tariffName);
                                        setBaseCostMonth(product.baseCostMonth);
                                        setBaseCostKwh(product.costKwh);
                                        setRule(product.rule);
                                        handleShow();
                                    }}>Update</Button>
                                    <Button variant="outline-danger" onClick={event => {
                                        deleteOne(product._id);
                                    }}>Delete</Button>
                                </th>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Product</Modal.Title>
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
                    <Label htmlFor="base-cost-month">Base Cost Month</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: 5.0
                        </InputGroup.Text>
                        <FormControl type="number" onChange={event => setBaseCostMonth(event.target.value)} value={baseCostMonth} id="base-cost-month" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <Label htmlFor="cost-per-kwh">Base Cost Per Kwh</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: 0.78
                        </InputGroup.Text>
                        <FormControl type="number" onChange={event => setBaseCostKwh(event.target.value)} value={baseCostKwh} id="cost-per-kwh" aria-describedby="basic-addon3" />
                    </InputGroup>
                    <Label htmlFor="rule">Rule</Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            Example: packaged
                        </InputGroup.Text>
                        <FormControl onChange={event => setRule(event.target.value)} value={rule} id="rule" aria-describedby="basic-addon3" />
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