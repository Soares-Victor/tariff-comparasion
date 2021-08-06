import {withApollo} from "@apollo/client/react/hoc";
import NotificationAlert from "react-notification-alert";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import React, {useState} from "react";
import {MUTATION_UPLOAD_FILE} from "../../../queries";
import {useMutation} from "@apollo/client";

function CostUploadFileToProcess(props) {
    const [file, setFile] = useState(false);
    const [upload] = useMutation(MUTATION_UPLOAD_FILE);

    const notificationAlertRef = React.useRef(null);

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

    const uploadFile = async () => {
        let files = []
        for (let i = 0; i < file.length; i++) {
            const fBase64 = await convertBase64(file[i]);
            const fileContentB64 = fBase64.toString().substring(fBase64.toString().indexOf(",") + 1);
            const fName = file[i].name
            files.push({
                name: fName,
                base64: fileContentB64
            });

        }
        await upload({variables: {fileProcessModel: files}})
            .then(value => notify(value.data.uploadFileToProcess, "success"))
            .catch(reason => notify(reason.message, "danger"));
    }

    const contentFileExample =
        "{\"firstName\":\"Albert\",\"lastName\":\"Einstein\",\"installNumber\":\"1234456\",\"kwhYear\": 3500}\n" +
        "{\"firstName\":\"Isac\",\"lastName\":\"Newton\",\"installNumber\":\"10203040\",\"kwhYear\": 4500}\n";


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
                            <CardTitle tag="h4">Upload File</CardTitle>
                            <p className="category">Upload File to Process</p>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-md-1" md="2">
                                        <Input
                                            multiple
                                            type="file"
                                            onChange={event => setFile(event.target["files"])}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                            <br/>
                            {file &&
                                <Button className="btn-fill"
                                        color="primary"
                                        type="submit"
                                        onClick={uploadFile}>
                                    Upload
                                </Button>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <h5 className="title">Details</h5>
                        </CardHeader>
                        <CardBody>
                            <p style={ {borderTop: "1px solid gray"} }>
                                <span style={{ fontSize: '15pt'}}>
                                    Obs.
                                </span>
                                To upload a file, please make sure that is in JSONL (each line is an object) format, like the example below.
                            </p>
                            <p style={{color: "blue"}}>file-name.jsonl</p>
                            <div style={{border: "1px solid lightGray", borderRadius: "4px",textAlign: "center", padding: "20px"}}>
                                <pre>{contentFileExample}</pre>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default withApollo(CostUploadFileToProcess);