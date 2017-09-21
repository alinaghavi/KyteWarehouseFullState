import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Router from './Router';
import Store from './Store';
import { AsyncStorage } from 'react-native';
import { persistStore } from 'redux-persist';


class App extends Component {


    componentDidMount() {
        persistStore(Store, {
            storage: AsyncStorage,
        })
    }



    componentWillMount() {

    }

    render() {
        return (
            <Provider store={Store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
