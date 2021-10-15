import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryScreen = ({ navigation }) => {
    return (
        <View style={styles.containerCategory} >
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ fontSize: 30, color: "black" }}>
                    Choose one category to do conversion
                </Text>
            </View>
            <View style={styles.rowCategory}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.categoryArea}
                        onPress={
                            () => navigation.navigate("Area")
                        }
                    >
                        <Text style={styles.categoryText}> Area</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.categoryLength}
                        onPress={
                            () => navigation.navigate("Length")
                        }
                    >
                        <Text style={styles.categoryText}> Length</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.rowCategory}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.categorySpeed}
                        onPress={
                            () => navigation.navigate("Volume")
                        }
                    >
                        <Text style={styles.categoryText}> Volume</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.categoryWeight}
                        onPress={
                            () => navigation.navigate("Weight")
                        }
                    >
                        <Text style={styles.categoryText}> Weight</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    containerCategory: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "grey",
    },
    rowCategory: {
        flex: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    categoryText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    categoryArea: {
        backgroundColor: "red",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryLength: {
        backgroundColor: "yellow",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    categorySpeed: {
        backgroundColor: "pink",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryWeight: {
        backgroundColor: "blue",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default CategoryScreen;