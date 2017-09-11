import {
    SHIPMENT_NUMBER_CHANGED,
    GET_SHIPMENT_DETAILS,
    GET_SHIPMENT_DETAILS_FAILED,
    GET_SHIPMENT_DETAILS_SUCCEED,
    SHIPMENT_WEIGHT_CHANGED,

} from '../actions/types';

const INITIAL_STATE = {
    shipmentNumber:'',
    error: '',
    loading: false,
    shipmentDetails:[],
    shipmentWeight:'',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHIPMENT_NUMBER_CHANGED:
            return {...state, shipmentNumber: action.payload};
        case GET_SHIPMENT_DETAILS:
            return { ...state, loading: true, error: '' };
        case GET_SHIPMENT_DETAILS_SUCCEED:
            return { ...state, ...INITIAL_STATE, shipmentDetails: action.payload };
        case GET_SHIPMENT_DETAILS_FAILED:
            return { ...state, error: 'Shipment Number Incorrect.', loading: false };

        default:
            return state;
    }
};
