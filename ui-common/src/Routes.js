import {BrowserRouter, Switch} from "react-router-dom";
import {PrivateRoute} from "./utils/PrivateRoute";
import messages from "./messages";
import Layout from "./Layout";
import {IntlProvider} from "react-intl";
import React, {useState} from "react";
import './styles/App.scss';
import CostCalculate from "./components/tariff/costs/CostCalculate";
import CostUploadFile from "./components/tariff/costs/CostUploadFile";
import CostListAllCalculations from "./components/tariff/costs/CostListAllCalculations";
import ProductsManager from "./components/tariff/products/ProductsManager";
import Home from "./Home";
import About from "./components/about/About";


function Routes() {
    const [locale, setLocale] = useState('en');
    return(
        <BrowserRouter>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <Layout setLocale={setLocale}/>
            </IntlProvider>
            <Switch>
                <PrivateRoute component={Home} path={`${process.env.PUBLIC_URL}/home`} exact={true} />
                <PrivateRoute component={About} path={`${process.env.PUBLIC_URL}/about`} exact={true} />
                <PrivateRoute component={CostCalculate} path={`${process.env.PUBLIC_URL}/costs/calculate`} exact={true} />
                <PrivateRoute component={CostUploadFile} path={`${process.env.PUBLIC_URL}/costs/upload`} exact={true} />
                <PrivateRoute component={CostListAllCalculations} path={`${process.env.PUBLIC_URL}/costs/calculation/listall`} exact={true} />
                <PrivateRoute component={ProductsManager} path={`${process.env.PUBLIC_URL}/product`} exact={true} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;