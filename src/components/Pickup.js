import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {pickupNumberChanged, getPickupDetails, completePickup} from '../actions';
import {Card, Spinner, CardSection, Button, Input, InpuWithoutLabel, Label} from './common';

class Pickup extends Component {
    onViewButtonPress() {
        const {pickupNumber, apiKey, getPickupDetails} = this.props;

        getPickupDetails({pickupNumber, apiKey});
    }

    renderViewPickupButton() {
        if (this.props.pickupBtnloading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={this.onViewButtonPress.bind(this)}>
                View Pickup
            </Button>
        );
    }

    onCompletePickupPress() {
        const {pickupNumber, apiKey, completePickup, pickupDetails} = this.props;

        completePickup({pickupNumber, apiKey, pickupOwner: pickupDetails.owner.id });
    }

    renderCompletePickupBtn() {
        if (this.props.completePickupBtnloading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={this.onCompletePickupPress.bind(this)}>
                Complete Pickup
            </Button>
        );
    }


    onPickupNumberChange(text) {
        this.props.pickupNumberChanged(text);
    }

    renderPickupDetails() {
        var {address, owner} = this.props.pickupDetails;
        if (owner !== undefined) {
            return (
                <View>
                    <CardSection>
                        <Label
                            labelText="From :"
                            Textvalue={address.name}
                        />
                    </CardSection>

                    <CardSection>
                        <Label
                            labelText="Address :"
                            Textvalue={address.region.summary}
                        />
                    </CardSection>

                    <CardSection>
                        {this.renderCompletePickupBtn()}
                    </CardSection>

                </View>
            );
        }
    }

    render() {
        return (
            <Card>
                <CardSection style={{backgroundColor: '#fff'}}>
                    <Text style={styles.welcomeText}>
                        Currenu User :
                    </Text>

                    <Text style={styles.welcomeText}>
                        {this.props.user.name}
                    </Text>
                </CardSection>

                <CardSection>
                    <InpuWithoutLabel
                        placeholder="Pickup Number"
                        onChangeText={this.onPickupNumberChange.bind(this)}
                        value={this.props.pickupNumber}
                        keyboardType="numeric"
                        textStyle={{width: 300}}
                    />
                </CardSection>


                <CardSection>
                    {this.renderViewPickupButton()}
                </CardSection>

                <CardSection>
                    <Text style={styles.errorTextStyle}>
                        {this.props.pickupError}
                    </Text>
                </CardSection>

                <CardSection style={{flexDirection: "column"}}>
                    {this.renderPickupDetails()}
                </CardSection>

                <CardSection>
                    <Text style={styles.errorTextStyle}>
                        {this.props.completePickupError}
                    </Text>
                    <Text style={styles.errorTextStyle}>
                        {console.log("Pending Shipments", this.props.pendingShipments)}
                    </Text>
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    welcomeText: {
        fontSize: 25,
        color: 'green',
        flex: 1,
        textAlign: 'center'
    }
};

const mapStateToProps = ({pickup, auth}) => {
    const {pickupNumber, pickupError, pickupDetails, pickupBtnloading, completePickupBtnloading, completePickupError, pendingShipments} = pickup;
    const {user, apiKey} = auth;
    return {pickupNumber, apiKey, user, pickupError, pickupDetails, pickupBtnloading, completePickupBtnloading, completePickupError, pendingShipments};
};

export default connect(mapStateToProps, {
    pickupNumberChanged, getPickupDetails, completePickup
})(Pickup);

