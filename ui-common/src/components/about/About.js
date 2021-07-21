function About() {
    return (
        <div className={'main'}>
            <h1>About</h1>
            <h2>Last updates</h2>
            <ul>
                <li>Delete all processed calculations</li>
                <li>Delete many products</li>
                <li>More operations over calculations and products</li>
                <li>All operations is most easy</li>
                <li>When creating new Product, change message to insert value month on base costs</li>
                <li>New endpoints for more operations over costs and products</li>
                <li>New version about products comparison</li>
                <li>Bug fix when upload file to aws s3</li>
                <li>Bug when update a product</li>
            </ul>
            <h2>Coming soon</h2>
            <ul>
                <li>Fix new styles</li>
                <li>Management Products</li>
                <li>Upload Multiples Files to Process</li>
                <li>Alerts Style Bootstrap</li>
                <li>All stack deployed to cloud and CI/CD</li>
            </ul>
            <h3>Version</h3>
            <p>1.0.1-SNAPSHOT</p>
        </div>
    )
}

export default About;