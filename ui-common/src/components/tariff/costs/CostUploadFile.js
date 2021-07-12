import {withApollo} from "@apollo/client/react/hoc";
import '../../../styles/bootstrap.min.css'
import '../../../styles/Tabble.css'
import {Button} from "react-bootstrap";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {MUTATION_UPLOAD_FILE} from "../../../Queries";

function CostUploadFile() {

    const [file, setFile] = useState(false);
    const [upload] = useMutation(MUTATION_UPLOAD_FILE)

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
        const base64 = await convertBase64(file);
        let fileContentBase64 = await base64.toString().substring(base64.toString().indexOf(",") + 1);
        await upload({variables: {fileProcessModel: {name: file.name, base64: fileContentBase64}}})
            .then(value => {
                alert(value.data.uploadFileToProcess);
                window.location.reload();
            })
            .catch(reason => {
                alert(reason)
                window.location.reload();
            })
    }

    const contentFileExample =
        "{\"firstName\":\"Albert\",\"lastName\":\"Einstein\",\"installNumber\":\"1234456\",\"kwhYear\": 3500}\n" +
        "{\"firstName\":\"Isac\",\"lastName\":\"Newton\",\"installNumber\":\"10203040\",\"kwhYear\": 4500}\n";

    return (
        <div className={'main'}>
            <h1>Cost Upload</h1>
            <input type="file" onChange={event => setFile(event.target.files[0])}/>
            {file &&
                <Button variant="outline-success" size="lg" onClick={uploadFile}>Upload</Button>
            }
            <br/><br/>
            <p style={ {borderTop: "1px solid gray"} }>
                <span style={{ fontSize: '15pt'}}>
                    Obs.
                </span>
                To upload a file, please make sure that is in JSONL (each line is an object) format, like the example below.
            </p>
            <p style={{color: "blue"}}>file-name.jsonl</p>
            <div style={{border: "1px solid lightGray", borderRadius: "4px",backgroundColor: "whitesmoke", textAlign: "center", padding: "20px"}}>
                <pre>{contentFileExample}</pre>
            </div>

        </div>
    );
}

export default withApollo(CostUploadFile)