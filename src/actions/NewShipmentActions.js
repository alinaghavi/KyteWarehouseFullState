import {Actions} from 'react-native-router-flux';
import {
    SHIPMENT_NUMBER_CHANGED,
    GET_SHIPMENT_DETAILS,
    GET_SHIPMENT_DETAILS_FAILED,
    GET_SHIPMENT_DETAILS_SUCCEED,
} from './types';

export const ShipmentNumberChanged = (text) => {
    return {
        type: SHIPMENT_NUMBER_CHANGED,
        payload: text
    };
};


export const getShipmentDetails = ({shipmentNumber, apiKey}) => {
    return (dispatch) => {
        dispatch({type: GET_SHIPMENT_DETAILS});
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
            res.json().then(
                (shipment) => {
                    if (res.status == 200) {
                        getShipmentDetailsSucceed(dispatch, shipment);
                    }
                    if (res.status != 200) {
                        getShipmentDetailsFailed(dispatch);
                    }
                }
            )
        });
    }
};


const getShipmentDetailsFailed = (dispatch) => {
    dispatch({type: GET_SHIPMENT_DETAILS_FAILED});
};

const getShipmentDetailsSucceed = (dispatch, shipmentDetails) => {
    dispatch({
        type: GET_SHIPMENT_DETAILS_SUCCEED,
        payload: shipmentDetails
    });

    Actions.shipmentdetails({shipmentDetails: shipmentDetails, title: `Shipment Number ${shipmentDetails.id}` });
};

