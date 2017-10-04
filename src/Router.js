import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
    Scene,
    Router,
    Tabs,
    Stack,
} from 'react-native-router-flux';

import LoginForm from './components/LoginForm';
import Pickup from './components/Pickup';
import Shipment from './components/Shipment';
import NewShipment from './components/NewShipment';
import ShipmentDetails from './components/ShipmentDetails';

import TabIcon from './components/TabIcon';


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});


const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" title="Header" hideNavBar={true}>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login"/>
                </Scene>

                <Stack
                    hideNavBar
                    titleStyle={{alignSelf: 'center'}}
                >
                    <Tabs
                        key="tabbar"
                        swipeEnabled
                        showLabel={false}
                        tabBarStyle={styles.tabBarStyle}
                        activeBackgroundColor="white"
                        inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
                    >

                        <Scene
                            key="Pickup"
                            component={Pickup}
                            title="Pickup"
                            icon={TabIcon}

                        />
                        <Scene
                            key="Shipment"
                            component={Shipment}
                            title="Shipment"
                            icon={TabIcon}
                        />


                    </Tabs>
                </Stack>
            </Scene>


        </Router>
    );
};

export default RouterComponent;
