import {Redirect, Route} from "react-router-dom";


export const PrivateRoute = (props) => {

    const { component, ...other } = props;
    const Component = component;

    return (
        <Route
            {...other}
            render={(props) => {

                return localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `${process.env.PUBLIC_URL}/`,
                            state: {from: props.location}
                        }}
                    />
                );
            }}
        />
    );
}
