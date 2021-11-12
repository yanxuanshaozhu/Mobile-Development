import React from "react";
import { View, Text } from 'react-native';
import { useValue } from './ValueContext';

const AboutText = () => {
    const { currentValue } = useValue();
    const text = currentValue.text;
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 20 }}>
                {text}
            </Text>
        </View>
    );
}

export default AboutText;