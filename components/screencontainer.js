import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScreenTemplate = ({ left, right }) => {
    return (
        <View style={styles.container}>
            {left}
            <View style={styles.containerMiddle}>
                <Text>
                    =
                </Text>
            </View>
            {right}
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flex: 1,
    },
    containerMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
})

export default ScreenTemplate;