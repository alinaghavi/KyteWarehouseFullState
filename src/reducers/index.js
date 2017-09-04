import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NewShipmentReducer from './NewShipmentsReducer';

export default combineReducers({
  auth: AuthReducer,
  newShipment: NewShipmentReducer,
});
