import {withApollo} from "@apollo/client/react/hoc";
import NotificationAlert from "react-notification-alert";
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";
import React from "react";
import {MUTATION_DELETE_FILE_TO_PROCESS, QUERY_LIST_ALL_FILES_TO_PROCESS} from "../../../queries";
import {useMutation, useQuery} from "@apollo/client";

function CostListAllFilesToProcess(props) {

    const listAllFilesToProcess = useQuery(QUERY_LIST_ALL_FILES_TO_PROCESS);
    const [mutationDeleteFiles] = useMutation(MUTATION_DELETE_FILE_TO_PROCESS);

    const deleteFiles = (id) => {
        if (!id) {
            let ids = [];
            let idsToProcess = [];
            let elementsByClassName = document.getElementsByClassName("ids-to-delete");
            for (let i = 0; i < elementsByClassName.length; i++) {
                ids.push(elementsByClassName[i].id);
            }
            for (let i = 0; i < ids.length; i++) {
                if (document.getElementById(ids[i])["checked"]) idsToProcess.push(ids[i]);
            }
            mutationDeleteFiles({variables: {ids: idsToProcess}})
                .then(value => notify(value.data.deleteFilesToProcess, "success"))
                .catch(reason => notify(reason.message, "danger"));
        }
        else {
            mutationDeleteFiles({variables: {ids: [id]}})
                .then(value => notify(value.data.deleteFilesToProcess, "success"))
                .catch(reason => notify(reason.message, "danger"));
        }
    }

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

    return (
        <div className="content">
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <CardTitle tag="h4">Files to Process</CardTitle>
                            <p className="category">List all Files to Process</p>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader>
                            <h5 className="title">Files to Process</h5>
                        </CardHeader>
                        <CardBody>
                            <Table className="tablesorter" responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>File Name</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listAllFilesToProcess.data &&
                                listAllFilesToProcess.data.query.map((id) =>
                                    <tr>
                                        <td>
                                            <input className="ids-to-delete" type='checkbox' id={id}/>
                                        </td>
                                        <td key={id}>{id}</td>
                                        <td>
                                            <a href="#" onClick={() => deleteFiles(id)}><i className="tim-icons icon-trash-simple" /></a>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                            <Button onClick={() => deleteFiles(null)} className="btn-fill" color="danger" type="submit">
                                Delete Files Selected
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default withApollo(CostListAllFilesToProcess);