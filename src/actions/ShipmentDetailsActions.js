import {Actions} from 'react-native-router-flux';
import {
    SHIPMENT_WEIGHT_CHANGED,
    SHIPMENT_INVENTORY_SELECTED,
    SHIPMENT_PROCESSED,
    SHIPMENT_PROCESS_SUCCEED,
    SHIPMENT_PROCESS_FAILED,
    INITIALIZE_WEIGHT_AND_INVENTORY_INPUT,
    PARCEL_HAS_NO_WEIGHT,
    PARCEL_HAS_WEIGHT,
    INITIALIZE_WEIGHT_AND_INVENTORY_FAILED,
    GET_INVENTORIES_LIST_SUCCEED,
    GET_INVENTORIES_LIST_FAILED,
} from './types';


export const shipmentWeightChange = (text) => {
    return {
        type: SHIPMENT_WEIGHT_CHANGED,
        payload: text
    };
};


export const getInventoriesList = () => {
    return (dispatch) => {
        var url = "https://kyte.ir/api/v1/inventories/availables";
        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-Api-Key": apiKey,
                    "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
                }
            }).then((res) => {
            if (res.status == 200) {
                res.json().then(
                    (inventoriesList) => {
                        getInventoriesListSucceed(dispatch, inventoriesList);
                    }
                )
            }
            if (res.status != 200) {
                getInventoriesListFailed(dispatch);
            }
        });
    };
};

const getInventoriesListFailed = (dispatch) => {
    dispatch({type: GET_INVENTORIES_LIST_FAILED});
};

const getInventoriesListSucceed = (dispatch, inventoriesList) => {
    var inventoriesObj = [];
    inventoriesList.map(function (key) {
        inventoriesObj.push({
            SKU: key.sku,
            CODE: key.material.code
        })
    });
    var inventorySku = [];
    var inventoryCode = [];
    inventoriesObj.map(function (key) {
        inventoryCode.push(key.CODE);
        inventorySku.push(key.SKU);
    });
    dispatch({
        type: GET_INVENTORIES_LIST_SUCCEED,
        payload: {inventorySku, inventoryCode}
    });
};


export const shipmentInventorySelect = (inventorySku, inventoryCode) => {
    return {
        type: SHIPMENT_INVENTORY_SELECTED,
        payload: {inventorySku, inventoryCode}
    };
};

export const initializeWeightAndInventoryInput = (shipmentNumber) => {
    return (dispatch) => {
        dispatch({type: INITIALIZE_WEIGHT_AND_INVENTORY_INPUT});

        var url = `https://kyte.ir/api/v1/shipments/${shipmentNumber}`;
        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-Api-Key": apiKey,
                    "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
                }
            }).then((res) => {
            if (res.status == 200) {
                res.json().then(
                    (shipment) => {
                        initializeWeightAndInventoryInputSucceed(dispatch, shipment.parcelProcessed, shipment.parcelWeight);
                    }
                )
            }
            if (res.status != 200) {
                initializeWeightAndInventoryInputFailed(dispatch);
            }

        });
    }
};


const initializeWeightAndInventoryInputFailed = (dispatch) => {
    dispatch({type: INITIALIZE_WEIGHT_AND_INVENTORY_FAILED});
};

const initializeWeightAndInventoryInputSucceed = (dispatch, parcelProcessed, parcelWeight) => {
    if (parcelProcessed) {
        parcelHasWeight(dispatch , parcelWeight);
    } else {
        parcelHasNotWeight(dispatch, parcelProcessed);
    }
};

const parcelHasWeight = (dispatch, parcelWeight) => {
    dispatch({
        type: PARCEL_HAS_WEIGHT,
        payload: parcelWeight
    });
};

const parcelHasNotWeight = (dispatch) => {
    dispatch({type: PARCEL_HAS_NO_WEIGHT});
};

export const shipmentProcess = ({shipmentId, shipmentWeight, shipmentInventorySku}) => {
    return (dispatch) => {

        dispatch({type: SHIPMENT_PROCESSED});

        var url = `https://kyte.ir/api/v1/shipments/${shipmentId}/process`;

        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-Api-Key": apiKey,
                    "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
                },
                body: JSON.stringify({
                    parcelWeight: shipmentWeight,
                    inventory: shipmentInventorySku
                })

            })
            .then((res) => {
                if (300 >= res.status && res.status >= 200) {
                    shipmentProcessSuccess(dispatch);
                }
                if (300 < res.status || res.status < 200) {
                    shipmentProcessFail(dispatch);
                }
            })
    }
};


const shipmentProcessFail = (dispatch) => {
    dispatch({type: SHIPMENT_PROCESS_FAILED});
};

const shipmentProcessSuccess = (dispatch, shipmentId) => {
    dispatch({
        type: SHIPMENT_PROCESS_SUCCEED,
        payload: shipmentId
    });

};
