import React from 'react';
import {TextInput, View, Text} from 'react-native';

const InpuWithoutLabel = ({value, onChangeText, placeholder, secureTextEntry, keyboardType, style}) => {
    const {inputStyle, containerStyle} = styles;

    return (
        <View style={[containerStyle, style]}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
            {/*{console.log("Style is",this.props.style)}*/}
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1,
        textAlign:'center'
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export {InpuWithoutLabel};
