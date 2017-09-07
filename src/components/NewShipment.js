import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {shipmentNumberChanged, getShipmentDetails} from '../actions';
import {Card, Spinner, CardSection, Button, Input, InpuWithoutLabel} from './common';

class NewShipment extends Component {
    onButtonPress() {
        const { shipmentNumber, apiKey } = this.props;
        this.props.getShipmentDetails({ shipmentNumber, apiKey });
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


    onShipmentNumberChange(text) {
        this.props.shipmentNumberChanged(text);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <InpuWithoutLabel
                        placeholder="Shipment Number"
                        onChangeText={this.onShipmentNumberChange.bind(this)}
                        value={this.props.shipmentNumber}
                        keyboardType= "numeric"
                    />
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({newShipment}) => {
    const {shipmentNumber, error, loading} = newShipment;

    return {shipmentNumber, error, loading};
};

export default connect(mapStateToProps, {
    shipmentNumberChanged, getShipmentDetails
})(NewShipment);

