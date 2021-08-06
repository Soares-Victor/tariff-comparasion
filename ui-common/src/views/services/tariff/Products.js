import {withApollo} from "@apollo/client/react/hoc";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Table
} from "reactstrap";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {
    MUTATION_CREATE_PRODUCT,
    MUTATION_DELETE_PRODUCT,
    MUTATION_UPDATE_PRODUCT,
    QUERY_LIST_ALL_PRODUCT
} from "../../../queries";
import NotificationAlert from "react-notification-alert";

function Products(props) {

    const listAllProducts = useQuery(QUERY_LIST_ALL_PRODUCT);
    const [update] = useMutation(MUTATION_UPDATE_PRODUCT);
    const [save] = useMutation(MUTATION_CREATE_PRODUCT);
    const [deleteProduct] = useMutation(MUTATION_DELETE_PRODUCT);

    const [id, setId] = useState("");
    const [tariffName, setTariffName] = useState("");
    const [description, setDescription] = useState("");
    const [maxConsumption, setMaxConsumption] = useState("");
    const [baseCost, setBaseCost] = useState("");
    const [costKwh, setCostKwh] = useState("");
    const [month, setMonth] = useState(false);

    const notificationAlertRef = React.useRef(null);

    const cleanFields = () => {
        setId("")
        setTariffName("");
        setDescription("");
        setMonth(false);
        setMaxConsumption("")
        setBaseCost("");
        setCostKwh("");
    }

    const saveProduct = () => {
        let product = {
            tariffName: tariffName,
            description: description,
            month: month,
            values: {
                baseCost: parseFloat(baseCost),
                kwhCost: parseFloat(costKwh),
                maxConsumption: maxConsumption ? (parseInt(maxConsumption) > 0 ? parseInt(maxConsumption) : null) : null
            }
        }
        if (!id) {
            save({variables: {productModel: product}})
                .then(value => {
                    notify(value.data.createOneProduct, "success");
                })
                .catch(reason => notify(reason.message, "danger"));
        }
        else {
            update({variables: {id: id, productModel: product}})
                .then(value => {
                    notify(value.data.updateOneProduct, "success")
                })
                .catch(reason => notify(reason.message, "danger"));
        }
    }

    const deleteOne = (id) => {
        if (window.confirm("Do you want to delete the product id: \n" + id + "\n?")){
            deleteProduct({variables: {id: id}})
                .then(value => notify(value.data.deleteOneProduct, "success"))
                .catch(reason => notify(reason.message, "danger"));
        }
    }

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
                            <CardTitle tag="h4">Products</CardTitle>
                            <p className="category">Product Management</p>
                        </CardHeader>
                        <Button className="btn-fill" color="primary" onClick={() => {
                            document.getElementById('save').scrollIntoView();
                            cleanFields();
                        }}>
                            Create New
                        </Button><br/>
                        <CardBody>
                            <Table className="tablesorter" responsive>
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
                                        <td>{product._id}</td>
                                        <td>{product.tariffName}</td>
                                        <td>{product.description}</td>
                                        <td>{product.month && <i className="tim-icons icon-check-2"/>}</td>
                                        <td>{product.values.baseCost}</td>
                                        <td>{product.values.kwhCost}</td>
                                        <td>{product.values.maxConsumption}</td>
                                        <td>
                                            <a href={"#save"} onClick={() => {
                                                cleanFields();
                                                setId(product._id)
                                                setTariffName(product.tariffName);
                                                setDescription(product.description);
                                                setMonth(product.month)
                                                setBaseCost(product.values.baseCost);
                                                setCostKwh(product.values.kwhCost);
                                                setMaxConsumption(product.values.maxConsumption)
                                            }}><i className="tim-icons icon-pencil" />
                                            </a>
                                        </td>
                                        <td>
                                            <a href={"#"} onClick={() => {
                                                deleteOne(product._id);
                                            }}><i className="tim-icons icon-trash-simple" />
                                            </a>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row id={"save"}>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Save Product</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="3">
                                        <FormGroup>
                                            <label>Id</label>
                                            <Input
                                                value={id}
                                                defaultValue="UI Common"
                                                disabled
                                                placeholder="12345"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-md-1" md="3">
                                        <FormGroup>
                                            <label>Tariff Name</label>
                                            <Input
                                                value={tariffName}
                                                onChange={event => setTariffName(event.target.value)}
                                                placeholder="Packaged Annual"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <FormGroup>
                                            <label>
                                                Description Tariff
                                            </label>
                                            <Input
                                                value={description}
                                                onChange={event => setDescription(event.target.value)}
                                                placeholder="Packaged Annual tariff. (kwhused - maxConsumption = exceeded * kwhCost)"
                                                type="text" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="3">
                                        <FormGroup>
                                            <label>Month charge (Else is an annual)</label>
                                            <br/>
                                            <Input
                                                checked={month}
                                                onChange={event => setMonth(event.target.checked)}
                                                style={{width: "60px", top: "30px"}}
                                                type="checkbox"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-md-1" md="3">
                                        <FormGroup>
                                            <label>Base Cost</label>
                                            <Input
                                                value={baseCost}
                                                onChange={event => setBaseCost(event.target.value)}
                                                placeholder="5.0"
                                                type="number"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-md-1" md="3">
                                        <FormGroup>
                                            <label>Base Cost Per Kwh</label>
                                            <Input
                                                value={costKwh}
                                                onChange={event => setCostKwh(event.target.value)}
                                                placeholder="0.78"
                                                type="number"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-md-1" md="3">
                                        <FormGroup>
                                            <label>Max Consumption</label>
                                            <Input
                                                value={maxConsumption}
                                                onChange={event => setMaxConsumption(event.target.value)}
                                                placeholder="4000"
                                                type="number"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={saveProduct} className="btn-fill" color="primary" type="submit">
                                Save
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default withApollo(Products);