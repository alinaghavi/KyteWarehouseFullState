import {Actions} from 'react-native-router-flux';
import {
    SHIPMENT_WEIGHT_CHANGED,
    SHIPMENT_PACKAGE_SELECTED,
    SHIPMENT_PROCESSED,
    SHIPMENT_PROCESS_SUCCEED,
    SHIPMENT_PROCESS_FAILED,
    INITIALIZE_WEIGHT_AND_PACKAGE_INPUT
} from './types';


export const shipmentWeightChange = (text) => {
    return {
        type: SHIPMENT_WEIGHT_CHANGED,
        payload: text
    };
};

export const shipmentPackageSelect = (packageId, packageName) => {
    return {
        type: SHIPMENT_PACKAGE_SELECTED,
        payload: {packageId, packageName}
    };
};

export const initializeWeightAndPackageInput = () => {
    return {
        type: INITIALIZE_WEIGHT_AND_PACKAGE_INPUT,
    };
};

export const shipmentProcess = ({ shipmentId, shipmentWeight , shipmentPackageId}) => {

    return (dispatch) => {

        dispatch({type: SHIPMENT_PROCESSED});

        var url = `https://kyte.ir/api/v1/shipments/${shipmentId}/process`;
        console.log("url is", url);

        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // "X-Api-Key": apiKey,
                    "X-Api-Key": '53lwot4cco00scggc4c488cs0k8ccos0wowgc0okk84gk84008',
                },
                body: JSON.stringify({
                    // parcelWeight: shipmentWeight,
                    // packagingMaterial: shipmentPackageId,
                    parcelWeight: shipmentWeight ,
                    parcelLength: 1,
                    parcelWidth: 1,
                    parcelHeight: 1,
                    packagingMaterial: 'E1',
                    packagingPrice: 2000,
                })

            })
            .then((res) => {
                if (res.status == 200) {
                    shipmentProcessSuccess(dispatch, shipmentId);
                }
                if (res.status != 200) {
                    shipmentProcessFail(dispatch, res);
                }
            })
    }
};


const shipmentProcessFail = (dispatch, res) => {
    dispatch({type: SHIPMENT_PROCESS_FAILED});
};

const shipmentProcessSuccess = (dispatch, shipmentId) => {
    console.log("Shipment proccessed successfully");
    dispatch({
        type: SHIPMENT_PROCESS_SUCCEED,
        payload: shipmentId
    });

    // Actions.shipmentdetails({shipmentDetails: shipmentDetails, title: `Shipment Number ${shipmentDetails.id}`});
};
