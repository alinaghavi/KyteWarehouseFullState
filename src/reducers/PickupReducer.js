import {
    PICKUP_NUMBER_CHANGED,
    GET_PICKUP_DETAILS,
    GET_PICKUP_DETAILS_SUCCEED,
    GET_PICKUP_DETAILS_FAILED,
    COMPLETE_PICKUP,
    COMPLETE_PICKUP_FAILED,
    COMPLETE_PICKUP_SUCCEED,
    GET_PENDIND_SHIPMENTS_SUCCEED,
    GET_PENDIND_SHIPMENTS_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    pickupNumber: '',
    pickupError: '',
    pickupBtnloading: false,
    completePickupBtnloading: false,
    completePickupError:'',
    pickupDetails: [],
    pendingShipments: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PICKUP_NUMBER_CHANGED:
            return {...state, pickupNumber: action.payload};
        case GET_PICKUP_DETAILS:
            return {...state, pickupBtnloading: true, pickupError: ''};
        case GET_PICKUP_DETAILS_SUCCEED:
            return {...state, pickupError:'', pickupBtnloading:false, pickupDetails: action.payload};
        case GET_PICKUP_DETAILS_FAILED:
            return {...state, pickupError: 'Pickup Number Incorrect.', pickupBtnloading: false};
        case COMPLETE_PICKUP:
            return {...state, completePickupBtnloading: true, completePickupError: ''};
        case COMPLETE_PICKUP_SUCCEED:
            return {...state, completePickupError:'', completePickupBtnloading:false};
        case COMPLETE_PICKUP_FAILED:
            return {...state, completePickupError: 'Some thing wrong', completePickupBtnloading: false};
        case GET_PENDIND_SHIPMENTS_SUCCEED:
            return {...state, pickupError:'', completePickupError:'', completePickupBtnloading:false};
        case GET_PENDIND_SHIPMENTS_FAILED:
            return {...state, completePickupError: 'Can Not Fetch Shipments of this pickup', completePickupBtnloading: false, pendingShipments: action.payload};

        default:
            return state;
    }
};
