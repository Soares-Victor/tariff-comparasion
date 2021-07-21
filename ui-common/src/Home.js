import '../src/styles/Common.css'
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

function Home() {
    return (
        <div className={'main'}>
            <h1>Home</h1>

            <Card style={{ width: '18rem', margin: 'auto' }}>
                <Card.Body>
                    <Card.Title>Costs</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Operation Costs</Card.Subtitle>
                    <Card.Text>
                        Inside this menu you can simulate and compare a cost of kwh per year to another products.
                        Beyond upload and check files to process.
                    </Card.Text>
                    <Card.Link href="#">
                        <Link to={`${process.env.PUBLIC_URL}/costs/calculate`}>
                            Calculate
                        </Link>
                    </Card.Link>
                    <Card.Link href="#">
                        <Link to={`${process.env.PUBLIC_URL}/costs/upload`}>
                            Upload
                        </Link>
                    </Card.Link>
                    <Card.Link href="#">
                        <Link to={`${process.env.PUBLIC_URL}/costs/files/listall`}>
                            List All Files to Process
                        </Link>
                    </Card.Link>
                    <Card.Link href="#">
                        <Link to={`${process.env.PUBLIC_URL}/costs/calculation/listall`}>
                            Check All
                        </Link>
                    </Card.Link>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem', margin: 'auto', marginTop: '20px' }}>
                <Card.Body>
                    <Card.Title>Products</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Operation Products</Card.Subtitle>
                    <Card.Text>
                        Manage all your products like check all, create new, update and delete products.
                    </Card.Text>
                    <Card.Link href="#">
                        <Link to={`${process.env.PUBLIC_URL}/product`}>
                            Management
                        </Link>
                    </Card.Link>
                </Card.Body>
            </Card>

            <div style={{textAlign: "center", marginTop: "10px",borderTop: "1px solid lightGray"}}>
                <a href="#">
                    <Link to={`${process.env.PUBLIC_URL}/about`}>
                        About
                    </Link>
                </a>
            </div>

        </div>
    );
}

export default Home;