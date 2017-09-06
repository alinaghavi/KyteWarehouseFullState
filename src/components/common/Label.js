import React from 'react';
import {View, Text} from 'react-native';

const Label = ({labelText, Textvalue}) => {
    const {TextvalueStyle, labelTextStyle, containerStyle} = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelTextStyle}>{labelText}</Text>
            <Text
                style={TextvalueStyle}
            >
                {Textvalue}
            </Text>
        </View>
    );
};

const styles = {
    TextvalueStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3,
        textAlign: 'center',
    },
    labelTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

    }
};

export {Label};
