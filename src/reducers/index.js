import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import NewShipmentReducer from './NewShipmentsReducer';
import ShipmentDetailsReducer from './ShipmentDetailsReducer';

export default combineReducers({
    auth: AuthReducer,
    newShipment: NewShipmentReducer,
    shipmentDetails: ShipmentDetailsReducer
});
