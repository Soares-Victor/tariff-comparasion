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
    const [aboutMe, setAboutMe] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");
    const [facebookLink, setFacebookLink] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressCountry, setAddressCountry] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressZipCode, setAddressZipCode] = useState("");
    const [photoUserBase64, setPhotoUserBase64] = useState("");

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

    function isSomeFieldChanged() {
        return !!(email || firstName || lastName || phone || aboutMe || linkedinLink || facebookLink || addressCity ||
            addressCountry || addressNumber || addressStreet || addressZipCode || photoUserBase64);
    }

    function getAccount() {
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
        return {
            client: data.data.getLoggedAccount.client || localStorage.getItem('realm'),
            username: data.data.getLoggedAccount.user || localStorage.getItem('user'),
            email: email || data.data.getLoggedAccount.email,
            firstName: firstName || data.data.getLoggedAccount.firstName,
            lastName: lastName || data.data.getLoggedAccount.lastName,
            phone: phone || data.data.getLoggedAccount.phone,
            aboutMe: aboutMe || data.data.getLoggedAccount.aboutMe,
            linkedinLink: linkedinLink || data.data.getLoggedAccount.linkedinLink,
            facebookLink: facebookLink || data.data.getLoggedAccount.facebookLink,
            photoBase64: photoUserBase64 || "",
            address: address
        };
    }

    function saveAccount() {
        saveAccountMutation({variables: {accountModel: getAccount()}})
            .then(value => notify(value.data.saveAccount, "success"))
            .catch(reason => notify(reason.message, "danger"))
    }

    const convertBase64 = (f) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(f)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
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
                                <Row>
                                    <Col className="pr-md-1" md="6">
                                        <FormGroup>
                                            <label>Linkedin Profile</label>
                                            <Input
                                                placeholder="http://linkedin.com"
                                                rows="4"
                                                type="text"
                                                onChange={event => setLinkedinLink(event.target.value)}
                                                defaultValue={data.data.getLoggedAccount.linkedinLink || ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-md-1" md="6">
                                        <FormGroup>
                                            <label>Facebook</label>
                                            <Input
                                                placeholder="http://facebook.com"
                                                rows="4"
                                                type="text"
                                                onChange={event => setFacebookLink(event.target.value)}
                                                defaultValue={data.data.getLoggedAccount.facebookLink || ""}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            {isSomeFieldChanged() &&
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="submit"
                                    onClick={() => saveAccount()}>
                                    Save
                                </Button>
                            }

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
                                <Button className="btn-icon btn-simple" onClick={() => {
                                    document.getElementById("img-input").click();
                                }}>
                                    <i className="tim-icons icon-pencil"/>
                                </Button>
                                <br/>
                                <input id="img-input" onChange={event => {
                                    convertBase64(event.target.files[0])
                                        .then(fBase64 => {
                                            setPhotoUserBase64(fBase64.toString().substring(fBase64.toString().indexOf(",") + 1));
                                        })
                                        .catch(reason => {notify(reason.message, "danger")});
                                }} style={{display: "none"}} type="file"/>
                                <img
                                    alt="..."
                                    className="avatar"
                                    src={photoUserBase64 ? `data:image/png;base64,${photoUserBase64}` :
                                        (data.data.getLoggedAccount.photoBase64 ?
                                        `data:image/png;base64,${data.data.getLoggedAccount.photoBase64}` :
                                        require("assets/img/anime3.png").default)}
                                    onLoad={() => {
                                        if (photoUserBase64 && photoUserBase64 !== data.data.getLoggedAccount.photoBase64)
                                            saveAccount();
                                    }}
                                />
                                <h5 className="title">
                                    {(data.data.getLoggedAccount.firstName || firstName)
                                        .concat(" ").concat(data.data.getLoggedAccount.lastName || lastName)}</h5>
                            </div>
                            <FormGroup>
                                <label>About Me</label>
                                <Input
                                    cols="80"
                                    placeholder="Here can be your description"
                                    rows="4"
                                    type="textarea"
                                    onChange={event => setAboutMe(event.target.value)}
                                    defaultValue={data.data.getLoggedAccount.aboutMe || ""}
                                />
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <div className="button-container">
                                {data.data.getLoggedAccount.linkedinLink &&
                                    <Button className="btn-icon btn-round" color="linkedin" onClick={() => window.open(data.data.getLoggedAccount.linkedinLink, '_blank')}>
                                        <i className="fab fa-linkedin" />
                                    </Button>
                                }
                                {data.data.getLoggedAccount.facebookLink &&
                                    <Button className="btn-icon btn-round" color="facebook" onClick={() => window.open(data.data.getLoggedAccount.facebookLink, '_blank')}>
                                        <i className="fab fa-facebook" />
                                    </Button>
                                }
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

        </div>
    );

}

export default withApollo(UserProfile);