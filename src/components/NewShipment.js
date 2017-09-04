import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {ShipmentNumberChanged, getShipmentDetails} from '../actions';
import {Card, Spinner, CardSection, Button, Input} from './common';

class NewShipment extends Component {
    onButtonPress() {
        const { shipmentNumber } = this.props;
        this.props.getShipmentDetails({ shipmentNumber });
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
        this.props.ShipmentNumberChanged(text);
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Shipment Number"
                        placeholder=""
                        onChangeText={this.onShipmentNumberChange.bind(this)}
                        value={this.props.shipmentNumber}
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
    ShipmentNumberChanged, getShipmentDetails
})(NewShipment);

