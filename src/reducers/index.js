import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import Pickup from './PickupReducer';
import NewShipmentReducer from './NewShipmentsReducer';
import ShipmentDetailsReducer from './ShipmentDetailsReducer';

export default combineReducers({
    auth: AuthReducer,
    pickup: Pickup,
    newShipment: NewShipmentReducer,
    shipmentDetails: ShipmentDetailsReducer
});
