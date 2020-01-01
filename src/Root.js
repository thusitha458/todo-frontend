// @flow
import {registerServices, serviceManager} from "./services/manager";
import configureStore from "./store";
import {Provider} from "react-redux";
import React from "react";

const settings = {
    api: {
        baseUrl: "http://localhost:9000",
    },
};

type RootProps = {
    initialState: Object,
    children: Object,
};

const Root = ({initialState = {}, children}: RootProps) => {
    registerServices(settings);

    const store = configureStore(initialState, serviceManager);

    return (
        <Provider store={store} >
            {children}
        </Provider>
    );
};

export default Root;
