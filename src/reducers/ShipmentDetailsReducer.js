import {
    SHIPMENT_WEIGHT_CHANGED,
    SHIPMENT_PACKAGE_SELECTED
} from '../actions/types';

const INITIAL_STATE = {
    shipmentWeight:'',
    shipmentPackageId:'',
    shipmentPackageName:''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHIPMENT_WEIGHT_CHANGED:
            return {...state, shipmentWeight: action.payload};
        case SHIPMENT_PACKAGE_SELECTED:
            return {...state, shipmentPackageId: action.payload.packageId, shipmentPackageName: action.payload.packageName};
        default:
            return state;
    }
};
