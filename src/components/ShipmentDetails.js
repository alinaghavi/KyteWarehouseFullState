import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import ModalDropdown from "react-native-modal-dropdown";
import {
    shipmentWeightChange,
    shipmentPackageSelect,
    shipmentProcess,
    initializeWeightAndPackageInput,
    getPackagesList
} from '../actions';
import {
    Card,
    Spinner,
    CardSection,
    Label,
    Button,
    InpuWithoutLabel
} from './common';


var myPackages = ['بدون کارتون', 'G1', 'G2', 'G3', 'G4', 'G5'];

class ShipmentDetails extends Component {
    componentWillMount() {
        this.props.initializeWeightAndPackageInput();
        this.props.getPackagesList();
    }

    onShipmentWeightChange(text) {
        this.props.shipmentWeightChange(text);
    };

    onShipmentPackegeSelect(packageId, packageName) {
        this.props.shipmentPackageSelect(packageId, packageName);
    };

    onButtonPress() {
        const {shipmentDetails, shipmentWeight, shipmentPackageId, shipmentProcess } = this.props;
        shipmentProcess({shipmentId:shipmentDetails.id, shipmentWeight , shipmentPackageId});
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
            <View>
                <Card>
                    <CardSection>

                        <ModalDropdown
                            options={myPackages}
                            defaultValue={this.props.shipmentPackageName}
                            animated={false}
                            defaultIndex={parseInt(this.props.shipmentPackageId)}
                            style={styles.PackageWrapper}
                            textStyle={styles.dropDownText}
                            dropdownTextStyle={styles.dropDownItemText}
                            onSelect={this.onShipmentPackegeSelect.bind(this)}
                        />

                        <InpuWithoutLabel
                            style={styles.WeightWrapper}
                            placeholder="Weight"
                            keyboardType="numeric"
                            onChangeText={this.onShipmentWeightChange.bind(this)}
                            value={this.props.shipmentWeight}
                        />

                    </CardSection>

                    <CardSection style={{flexDirection: "column"}}>
                        {this.renderShipmentDetails()}
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Process
                        </Button>
                    </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                        {console.log(this.props)}

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
    PackageWrapper: {
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
    }
}
const mapStateToProps = ({shipmentDetails}) => {

    const {shipmentWeight, shipmentPackageId, shipmentPackageName, error, packagesList} = shipmentDetails;

    return {shipmentWeight, shipmentPackageId, shipmentPackageName, error, packagesList};
};

export default connect(mapStateToProps, {
    shipmentWeightChange, shipmentPackageSelect, shipmentProcess, initializeWeightAndPackageInput, getPackagesList
})(ShipmentDetails);
