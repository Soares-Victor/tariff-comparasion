import {withApollo} from "@apollo/client/react/hoc";
import React, {useState} from "react";
import NotificationAlert from "react-notification-alert";
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, FormGroup, Input, Row,} from "reactstrap";
import {useMutation, useQuery} from "@apollo/client";
import {MUTATION_SAVE_ACCOUNT, QUERY_GET_LOGGED_USER} from "../../../queries";

function UserProfile() {

    const [saveAccountMutation] = useMutation(MUTATION_SAVE_ACCOUNT);
    const data = useQuery(QUERY_GET_LOGGED_USER,
        {variables: {client: localStorage.getItem('realm'), user: localStorage.getItem('user')}});

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressCountry, setAddressCountry] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressZipCode, setAddressZipCode] = useState("");

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

    function saveAccount() {
        let address = {};
        let addressToSave = data.data.getLoggedAccount.address;
        if (addressToSave || addressCity || addressCountry || addressNumber || addressStreet || addressZipCode) {
            address = {
                city: addressCity ? addressCity : ((addressToSave && addressToSave.city) ? addressToSave.city : ""),
                country: addressCountry ? addressCountry : ((addressToSave && addressToSave.country) ? addressToSave.country : ""),
                number: addressNumber ? addressNumber : ((addressToSave && addressToSave.number) ? addressToSave.number : ""),
                street: addressStreet ? addressStreet : ((addressToSave && addressToSave.street) ? addressToSave.street : ""),
                zipCode: addressZipCode ? addressZipCode : ((addressToSave && addressToSave.zipCode) ? addressToSave.zipCode : ""),
            }
        }
        let account = {
            client: data.data.getLoggedAccount.client || localStorage.getItem('realm'),
            username: data.data.getLoggedAccount.user || localStorage.getItem('user'),
            email: email || data.data.getLoggedAccount.email,
            firstName: firstName || data.data.getLoggedAccount.firstName,
            lastName: lastName || data.data.getLoggedAccount.lastName,
            phone: phone || data.data.getLoggedAccount.phone,
            address: address
        }

        saveAccountMutation({variables: {accountModel: account}})
            .then(value => notify(value.data.saveAccount, "success"))
            .catch(reason => notify(reason.message, "danger"))
    }

    if (data.loading || data.error || !data.data.getLoggedAccount) return <></>;
    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Edit Profile</h5>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="3">
                                        <FormGroup>
                                            <label>Client / Realm</label>
                                            <Input
                                                disabled
                                                placeholder="Company"
                                                type="text"
                                                value={data.data.getLoggedAccount.client || localStorage.getItem('realm')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-md-1" md="3">
                                        <FormGroup>
                                            <label>Username</label>
                                            <Input
                                                disabled
                                                placeholder="Username"
                                                type="text"
                                                value={data.data.getLoggedAccount.username || localStorage.getItem('user')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="3">
                                        <FormGroup>
                                            <label htmlFor="exampleInputEmail1">
                                                Email address
                                            </label>
                                            <Input placeholder="mike@email.com"
                                                   type="email"
                                                   onChange={event => setEmail(event.target.value)}
                                                   defaultValue={data.data.getLoggedAccount.email || ""}/>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="3">
                                        <FormGroup>
                                            <label htmlFor="inputPhone">
                                                Phone
                                            </label>
                                            <Input placeholder="+55 11945284622"
                                                   type="text"
                                                   onChange={event => setPhone(event.target.value)}
                                                   defaultValue={data.data.getLoggedAccount.phone || ""}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <label>First Name</label>
                                            <Input
                                                placeholder="John"
                                                type="text"
                                                onChange={event => setFirstName(event.target.value)}
                                                defaultValue={data.data.getLoggedAccount.firstName || ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <FormGroup>
                                            <label>Last Name</label>
                                            <Input
                                                placeholder="Kudrow"
                                                type="text"
                                                onChange={event => setLastName(event.target.value)}
                                                defaultValue={data.data.getLoggedAccount.lastName || ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="10">
                                        <FormGroup>
                                            <label>Address</label>
                                            <Input
                                                placeholder="Home Address"
                                                type="text"
                                                onChange={event => setAddressStreet(event.target.value)}
                                                defaultValue={(data.data.getLoggedAccount.address && data.data.getLoggedAccount.address.street)
                                                    ? data.data.getLoggedAccount.address.street : ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="2">
                                        <FormGroup>
                                            <label>Number</label>
                                            <Input
                                                placeholder="Number"
                                                type="text"
                                                onChange={event => setAddressNumber(event.target.value)}
                                                defaultValue={(data.data.getLoggedAccount.address && data.data.getLoggedAccount.address.number)
                                                    ? data.data.getLoggedAccount.address.number : ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-md-1" md="4">
                                        <FormGroup>
                                            <label>City</label>
                                            <Input
                                                placeholder="City"
                                                type="text"
                                                onChange={event => setAddressCity(event.target.value)}
                                                defaultValue={(data.data.getLoggedAccount.address && data.data.getLoggedAccount.address.city)
                                                    ? data.data.getLoggedAccount.address.city : ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-md-1" md="4">
                                        <FormGroup>
                                            <label>Country</label>
                                            <Input
                                                placeholder="Country"
                                                type="text"
                                                onChange={event => setAddressCountry(event.target.value)}
                                                defaultValue={(data.data.getLoggedAccount.address && data.data.getLoggedAccount.address.country)
                                                    ? data.data.getLoggedAccount.address.country : ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="4">
                                        <FormGroup>
                                            <label>Postal Code</label>
                                            <Input
                                                placeholder="ZIP Code"
                                                type="text"
                                                onChange={event => setAddressZipCode(event.target.value)}
                                                defaultValue={(data.data.getLoggedAccount.address && data.data.getLoggedAccount.address.zipCode)
                                                    ? data.data.getLoggedAccount.address.zipCode : ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {/*<Row>
                                    <Col md="8">
                                        <FormGroup>
                                            <label>About Me</label>
                                            <Input
                                                cols="80"
                                                defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                                                placeholder="Here can be your description"
                                                rows="4"
                                                type="textarea"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>*/}
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <Button
                                className="btn-fill"
                                color="primary"
                                type="submit"
                                onClick={() => saveAccount()}>
                                Save
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="card-user">
                        <CardBody>
                            <CardText />
                            <div className="author">
                                <div className="block block-one" />
                                <div className="block block-two" />
                                <div className="block block-three" />
                                <div className="block block-four" />
                                <img
                                    alt="..."
                                    className="avatar"
                                    src={require("assets/img/emilyz.jpg").default}
                                />
                                <h5 className="title">{firstName.concat(" ").concat(lastName)}</h5>
                                <p className="description">Ceo/Co-Founder</p>
                            </div>
                            <div className="card-description">
                                Do not be scared of the truth because we need to restart the
                                human foundation in truth And I love you like Kanye loves
                                Kanye I love Rick Owens’ bed design but the back is...
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="button-container">
                                <Button className="btn-icon btn-round" color="facebook">
                                    <i className="fab fa-linkedin" />
                                </Button>
                                <Button className="btn-icon btn-round" color="twitter">
                                    <i className="fab fa-twitter" />
                                </Button>
                                <Button className="btn-icon btn-round" color="google">
                                    <i className="fab fa-google-plus" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

        </div>
    );

}

export default withApollo(UserProfile);