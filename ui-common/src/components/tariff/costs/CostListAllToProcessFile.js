import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css'
import '../../../styles/Tabble.css'
import {Button, InputGroup, Table} from "react-bootstrap";
import {useMutation, useQuery} from "@apollo/client";
import {MUTATION_DELETE_FILE_TO_PROCESS, QUERY_LIST_ALL_FILES_TO_PROCESS} from "../../../Queries";
import {CgRemove} from "react-icons/all";

function CostListAllToProcessFile() {

    const listAllFilesToProcess = useQuery(QUERY_LIST_ALL_FILES_TO_PROCESS)
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
                .then(value => {
                    alert(value.data.deleteFilesToProcess)
                    window.location.reload();
                })
                .catch(reason => {
                    alert(reason)
                });
        }
        else {
            mutationDeleteFiles({variables: {ids: [id]}})
                .then(value => {
                    alert(value.data.deleteFilesToProcess)
                    window.location.reload();
                })
                .catch(reason => {
                    alert(reason)
                });
        }
    }

    return <div className={'main'}>
        <h1>List All Files to Process</h1>

        <div id={'table'}>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th></th>
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
                                <a href="#" onClick={() => deleteFiles(id)}><CgRemove color="red" size={25}/>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>

        <Button variant="outline-danger" onClick={() => deleteFiles(null)} size="md" block>
            Delete files selected
        </Button>

    </div>

}

export default withApollo(CostListAllToProcessFile)