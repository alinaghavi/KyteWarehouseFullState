import {
    SHIPMENT_WEIGHT_CHANGED,
    SHIPMENT_PACKAGE_SELECTED,
    SHIPMENT_PROCESSED,
    SHIPMENT_PROCESS_SUCCEED,
    SHIPMENT_PROCESS_FAILED,
    INITIALIZE_WEIGHT_AND_PACKAGE_INPUT,
    GET_PACKAGES_LIST_SUCCEED,
    GET_PACKAGES_LIST_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    shipmentWeight: '',
    shipmentPackageId: 0,
    shipmentPackageName: 'بدون کارتون',
    loading: false,
    error: '',
    packagesList:[]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHIPMENT_WEIGHT_CHANGED:
            return {...state, shipmentWeight: action.payload};
        case SHIPMENT_PACKAGE_SELECTED:
            return {
                ...state,
                shipmentPackageId: action.payload.packageId,
                shipmentPackageName: action.payload.packageName
            };
        case SHIPMENT_PROCESSED:
            return {...state, loading: true, error: ''};
        case SHIPMENT_PROCESS_SUCCEED:
            return {...state, ...INITIAL_STATE, shipmentId: action.payload};
        case SHIPMENT_PROCESS_FAILED:
            return {...state, error: 'Shipment Does Not Processed Successfully.', loading: false};
        case INITIALIZE_WEIGHT_AND_PACKAGE_INPUT:
            return {...state, shipmentWeight:''};
        case GET_PACKAGES_LIST_SUCCEED:
            return { ...state, packagesList: action.payload };
        case GET_PACKAGES_LIST_FAILED:
            return { ...state, error: 'Unable to get packages list' };

        default:
            return state;
    }
};
