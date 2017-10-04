import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {apiKeyChanged, loginUser } from '../actions';
import {Card, CardSection, Input, Button, Spinner} from './common';

class LoginForm extends Component {
    onApiKeyChange(text) {
        this.props.apiKeyChanged(text);
    }

    onButtonPress() {
        const { apiKey } = this.props;
        this.props.loginUser({apiKey});
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large"/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="API Key"
                        placeholder="Your API key"
                        onChangeText={this.onApiKeyChange.bind(this)}
                        value={this.props.apiKey}
                        secureTextEntry= {true}
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

const mapStateToProps = ({auth}) => {
    const {apiKey, error, loading} = auth;
    return {apiKey, error, loading};
};

export default connect(mapStateToProps, {
    apiKeyChanged, loginUser
})(LoginForm);
