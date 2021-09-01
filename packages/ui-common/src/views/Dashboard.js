import React from "react";
import classNames from "classnames";
import {Bar, Line} from "react-chartjs-2";
import {Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row,} from "reactstrap";
import {
  char_options_default,
  chartRankingCalculations,
  chartRankingExpensiveProducts,
  chartTotalCalculations,
} from "variables/charts.js";
import {useQuery} from "@apollo/client";
import {QUERY_LIST_ALL_CALCULATION, QUERY_LIST_ALL_PRODUCT} from "../queries";

function Dashboard(props) {

  const listAllCalculation = useQuery(QUERY_LIST_ALL_CALCULATION);
  const listAllProducts = useQuery(QUERY_LIST_ALL_PRODUCT);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  window.chartCalculationsInstallNumbers = [];
  window.chartCalculationsInstallValues = [];
  window.chartTotalCalculation = 0.00;
  window.chartCalculationMonths = [];
  window.chartCalculationTotalMonth = [];
  window.chartProductNames = [];
  window.chartTotalProducts = [];

  if (listAllProducts.data) {
    listAllProducts.data.query.map(value => {
      window.chartProductNames.push(value.tariffName);
      window.chartTotalProducts.push(value.values.kwhCost);
    })
  }

  if (listAllCalculation.data) {
    listAllCalculation.data.query.forEach(value => {
      let date = value.dateProcessed.substr(0, 10);
      let month = monthNames[new Date(date).getMonth()];
      if (!window.chartCalculationsInstallNumbers.includes(value.installNumber)) window.chartCalculationsInstallNumbers.push(value.installNumber);
      if (!window.chartCalculationMonths.includes(month)) window.chartCalculationMonths.push(month);
    });
    window.chartCalculationsInstallNumbers.forEach(value => {
      let sum = 0;
      listAllCalculation.data.query.forEach(v => {
        if (v.installNumber === value){
          v.totalCosts.products.forEach(p => {
            sum = sum + p.totalYear.totalCosts;
          })
        }
      })
      window.chartCalculationsInstallValues.push(sum);
    });
    window.chartCalculationMonths.forEach(value => {
      let sumMonth = 0;
      listAllCalculation.data.query.forEach(v => {
        if (monthNames[new Date(v.dateProcessed.substr(0, 10)).getMonth()] === value ){
          v.totalCosts.products.forEach(p => {
            sumMonth = sumMonth + p.totalYear.totalCosts;
            window.chartTotalCalculation = window.chartTotalCalculation + p.totalYear.totalCosts;
          })
        }
      })
      window.chartCalculationTotalMonth.push(sumMonth);
    })
  }

  const [bigChartData, setbigChartData] = React.useState("data");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Top 10</h5>
                    <CardTitle tag="h2">Ranking</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data")}>
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Calculations
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartRankingCalculations[bigChartData]}
                    options={char_options_default}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Calculated</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-coins text-primary" /> {`${window.chartTotalCalculation} €`}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartTotalCalculations['data']}
                    options={chartTotalCalculations.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Ranking Most Expenses Products</h5>
                <CardTitle tag="h3">Ranking</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartRankingExpensiveProducts['data']}
                    options={chartRankingExpensiveProducts.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
