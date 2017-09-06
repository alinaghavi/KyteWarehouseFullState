import {Actions} from 'react-native-router-flux';
import {
    SHIPMENT_WEIGHT_CHANGED,
    SHIPMENT_PACKAGE_SELECTED
} from './types';


export const ShipmentWeightChange = (text) => {
    return {
        type: SHIPMENT_WEIGHT_CHANGED,
        payload: text
    };
};

export const ShipmentPackageSelect = (packageId, packageName) => {
    return {
        type: SHIPMENT_PACKAGE_SELECTED,
        payload: {packageId, packageName}
    };
};
