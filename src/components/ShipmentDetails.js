import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
// import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ModalDropdown from "react-native-modal-dropdown";
import {
    getInventoriesList,
    shipmentWeightChange,
    shipmentInventorySelect,
    shipmentProcess,
    initializeWeightAndInventoryInput
} from '../actions';
import {
    Card,
    Spinner,
    CardSection,
    Label,
    Button,
    InpuWithoutLabel
} from './common';


class ShipmentDetails extends Component {
    componentWillMount() {
        const {initializeWeightAndInventoryInput, getInventoriesList, shipmentDetails} = this.props;
        initializeWeightAndInventoryInput(shipmentDetails.id);
        getInventoriesList();
    }

    onShipmentWeightChange(text) {
        this.props.shipmentWeightChange(text);
    };

    onShipmentInventorySelect(shipmentInventorySku, shipmentInventoryCode) {
        this.props.shipmentInventorySelect(shipmentInventorySku, shipmentInventoryCode);
    };

    onButtonPress() {
        const {shipmentDetails, shipmentWeight, shipmentProcess, inventorySku, shipmentInventorySku} = this.props;
        shipmentProcess({
            shipmentId: shipmentDetails.id,
            shipmentWeight,
            shipmentInventorySku: inventorySku[shipmentInventorySku]
        });
    }


    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Process
            </Button>
        );
    }

    renderShipmentDetails() {
        const {state, address, service, contentClaim} = this.props.shipmentDetails;
        return (
            <View>
                <CardSection>
                    <Label
                        labelText="Status"
                        Textvalue={state}
                    />
                </CardSection>

                <CardSection>
                    <Label
                        labelText="Name"
                        Textvalue={address.name}
                    />
                </CardSection>

                <CardSection>
                    <Label
                        labelText="Service"
                        Textvalue={service.serviceName}
                    />
                </CardSection>

                <CardSection>
                    <Label
                        labelText="Address"
                        Textvalue={address.region.summary}
                    />
                </CardSection>

                <CardSection>
                    <Label
                        labelText="Content"
                        Textvalue={contentClaim}
                    />
                </CardSection>
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Card>
                    <ScrollView>
                        <View style={{flex: 1}}>
                            <CardSection>

                                <ModalDropdown
                                    options={this.props.inventoryCode}
                                    defaultValue={this.props.shipmentInventoryCode}
                                    animated={false}
                                    defaultIndex={parseInt(this.props.shipmentInventorySku)}
                                    style={styles.InventoryWrapper}
                                    textStyle={this.props.parcelProcessed ? [styles.dropDownText, styles.ParcelProcessed] : styles.dropDownText}
                                    dropdownTextStyle={styles.dropDownItemText}
                                    onSelect={this.onShipmentInventorySelect.bind(this)}
                                />

                                <InpuWithoutLabel
                                    style={styles.WeightWrapper}
                                    textStyle={this.props.parcelProcessed ? styles.ParcelProcessed : "" }
                                    placeholder="Weight"
                                    keyboardType="numeric"
                                    onChangeText={this.onShipmentWeightChange.bind(this)}
                                    value={this.props.shipmentWeight.toString()}
                                />

                            </CardSection>

                            <CardSection style={{flexDirection: "column"}}>
                                {this.renderShipmentDetails()}
                            </CardSection>
                        </View>
                    </ScrollView>
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}

                    </Text>

                </Card>
            </View>
        );
    }
}

const styles = {
    WeightWrapper: {
        borderColor: '#e1e1e1',
        borderWidth: 2,
        width: 170,
        height: 50,
        alignSelf: 'center',
    },
    InventoryWrapper: {
        borderColor: '#e1e1e1',
        borderWidth: 2,
        width: 170,
        paddingTop: 10,
        height: 50,
        alignSelf: 'center',
    },
    dropDownText: {
        fontSize: 20,
        textAlign: 'center',
    },
    dropDownItemText: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        width: 170,
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    ParcelProcessed: {
        color: 'red'
    }

};

const mapStateToProps = ({shipmentDetails}) => {


    const {shipmentWeight, shipmentInventorySku, shipmentInventoryCode, error, inventoryCode, inventorySku, parcelProcessed} = shipmentDetails;

    return {
        shipmentWeight,
        shipmentInventorySku,
        shipmentInventoryCode,
        error,
        inventoryCode,
        inventorySku,
        parcelProcessed
    };
};

export default connect(mapStateToProps, {
    shipmentWeightChange,
    shipmentInventorySelect,
    shipmentProcess,
    initializeWeightAndInventoryInput,
    getInventoriesList
})(ShipmentDetails);
