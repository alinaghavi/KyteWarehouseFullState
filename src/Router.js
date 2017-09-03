import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import NewShipment from './components/NewShipment';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" title="Header" hideNavBar={true}>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login"/>
                </Scene>

                <Scene key="main">
                    <Scene
                        onRight={() => console.log("Shipment Details")}
                        rightTitle="Add"
                        key="NewShipment"
                        component={NewShipment}
                        title="New Shipment"
                        initial
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
