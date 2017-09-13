import {
    SHIPMENT_WEIGHT_CHANGED,
    SHIPMENT_INVENTORY_SELECTED,
    SHIPMENT_PROCESSED,
    SHIPMENT_PROCESS_SUCCEED,
    SHIPMENT_PROCESS_FAILED,
    INITIALIZE_WEIGHT_AND_INVENTORY_INPUT,
    GET_INVENTORIES_LIST_SUCCEED,
    GET_INVENTORIES_LIST_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    shipmentWeight: '',
    shipmentInventorySku: 0,
    shipmentInventoryCode: 'G1',
    loading: false,
    error: '',
    inventorySku:[],
    inventoryCode:[]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHIPMENT_WEIGHT_CHANGED:
            return {...state, shipmentWeight: action.payload};
        case SHIPMENT_INVENTORY_SELECTED:
            return {
                ...state,
                shipmentInventorySku: action.payload.inventorySku,
                shipmentInventoryCode: action.payload.inventoryCode
            };
        case SHIPMENT_PROCESSED:
            return {...state, loading: true, error: ''};
        case SHIPMENT_PROCESS_SUCCEED:
            return {...state, ...INITIAL_STATE};
        case SHIPMENT_PROCESS_FAILED:
            return {...state, error: 'Shipment Does Not Processed Successfully.', loading: false};
        case INITIALIZE_WEIGHT_AND_INVENTORY_INPUT:
            return {...state, shipmentWeight: '',error:''};
        case GET_INVENTORIES_LIST_SUCCEED:
            return {
                ...state,
                inventorySku: action.payload.inventorySku,
                inventoryCode: action.payload.inventoryCode
            };
        case GET_INVENTORIES_LIST_FAILED:
            return {...state, error: 'Unable to get packages list'};

        default:
            return state;
    }
};
