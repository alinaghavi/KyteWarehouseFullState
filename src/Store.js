import {createStore, applyMiddleware, compose} from 'redux';

import { createLogger } from 'redux-logger';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import {autoRehydrate} from 'redux-persist';

const logger = createLogger()

export default createStore(
    reducers,
    {},
    compose(applyMiddleware(ReduxThunk, logger), autoRehydrate())
);
