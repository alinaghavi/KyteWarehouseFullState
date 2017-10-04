import {Actions} from 'react-native-router-flux';
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
} from './types';

export const pickupNumberChanged = (text) => {
    return {
        type: PICKUP_NUMBER_CHANGED,
        payload: text
    };
};

export const getPickupDetails = ({pickupNumber, apiKey}) => {
    return (dispatch) => {
        dispatch({type: GET_PICKUP_DETAILS});
        var url = `http://staging.kyte.ir/api/v1/pickups/${pickupNumber}`;

        return fetch(url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-Api-Key": apiKey,
                    // "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
                }
            }).then((res) => {
            if (res.status == 200) {
                res.json().then(
                    (pickupDetails) => {
                        getPickupDetailsSucceed(dispatch, pickupDetails);
                    }
                )
            }
            if (res.status != 200) {
                getPickupDetailsFailed(dispatch);
            }

        });
    }
};

const getPickupDetailsFailed = (dispatch) => {
    dispatch({type: GET_PICKUP_DETAILS_FAILED});
};

const getPickupDetailsSucceed = (dispatch, pickupDetails) => {
    dispatch({
        type: GET_PICKUP_DETAILS_SUCCEED,
        payload: pickupDetails
    });

    /*    Actions.shipmentdetails({
     shipmentDetails: shipmentDetails,
     title: `Shipment Number ${shipmentDetails.id}`,
     apiKey: apiKey
     });*/
};

export const completePickup = ({pickupNumber, apiKey, pickupOwner}) => {
    return (dispatch) => {
        dispatch({type: COMPLETE_PICKUP});
        var url = `http://staging.kyte.ir/api/v1/pickups/${pickupNumber}/transition/complete`;
        return fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-Api-Key": apiKey,
                    // "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
                }
            }).then((res) => {
            if (300 >= res.status && res.status >= 200) {
                res.json().then(
                    () => {
                        completePickupSucceed(dispatch, apiKey, pickupOwner );
                    }
                )
            }
            if (300 < res.status || res.status < 200) {
                completePickupFailed(dispatch);
            }

        });
    }
};

const completePickupFailed = (dispatch) => {
    dispatch({type: COMPLETE_PICKUP_FAILED});
};

const completePickupSucceed = (dispatch, apiKey, pickupOwner) => {
    dispatch({type: COMPLETE_PICKUP_SUCCEED});

    getPendingShipments(dispatch, apiKey, pickupOwner);
}

const getPendingShipments = (dispatch, apiKey, pickupOwner) => {
    var url = `http://staging.kyte.ir/api/v1/users/${pickupOwner}/pending-shipments`;
    return fetch(url,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Api-Key": apiKey,
                // "X-Api-Key": '1gu93pllj7vo8w000w8sw8w8sogk84wsg4co0gcw8g0kg84480',
            }
        }).then((res) => {
        if (res.status == 200) {
            res.json().then(
                (pendingsShipments) => {
                    getPendingShipmentsSucceed(dispatch, pendingsShipments);
                }
            )
        }
        if (res.status != 200) {
            getPendingShipmentsFailed(dispatch);
        }

    });

};

const getPendingShipmentsFailed = (dispatch) => {
    dispatch({type: GET_PENDIND_SHIPMENTS_FAILED});
};

const getPendingShipmentsSucceed = (dispatch, pendingsShipments) => {
    dispatch({
        type: GET_PENDIND_SHIPMENTS_SUCCEED,
        payload: pendingsShipments
    });
}
