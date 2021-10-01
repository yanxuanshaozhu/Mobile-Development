import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.containerHome} >
            <Image 
                source={require("./assets/icon.png")} 
                style={styles.backgroundImage}/>
            <View style={{flex: 1}}>
                <Text style={{fontWeight:"bold", fontSize: 42}}> Welcome to this unit converter </Text>
                <Button title="Go to Category"
                    onPress={
                        () => navigation.navigate('Category')}
                />
            </View>
        </View>
    );
};

const CategoryScreen = ({ navigation }) => {
    return (
        <View style={styles.containerCategory} >
            <View style={styles.rowCategory}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style = {styles.categoryArea}
                        onPress={
                            () => navigation.navigate("Area")
                        }
                    >     
                        <Text style={styles.categoryText}> Area</Text>           
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style = {styles.categoryLength}
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
                        style = {styles.categorySpeed}
                        onPress={
                            () => navigation.navigate("Volume")
                        }
                    >     
                        <Text style={styles.categoryText}> Volume</Text>           
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style = {styles.categoryWeight}
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


const AreaScreen = () => {
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();

    return (
        <View style = {styles.containerArea}> 
            <View style ={styles.containerAreaLeft}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange = {() => setNum1(num1)}
                    value={num1} 
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value1}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue1(itemValue)
                    
                    }
                    style ={{flex: 1}}>
                    <Picker.Item label="Are" value="are" />
                    <Picker.Item label="Square Kilometer" value="km2" />
                    <Picker.Item label="Square Meter" value="m2" />
                    <Picker.Item label="Square DeciMeter" value="dm2" />
                    <Picker.Item label="Square MilliMeter" value="mm2" />
                    <Picker.Item label="Acre" value="acre" />
                </Picker>
            </View>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>
                    =
                </Text>
            </View>
            <View style ={styles.containerAreaRight}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange = {() => setNum1(num2)}
                    value={num2} 
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value2}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue2(itemValue)
                    }
                    style={{flex: 1}}>
                    <Picker.Item label="Are" value="are" />
                    <Picker.Item label="Square Kilometer" value="km2" />
                    <Picker.Item label="Square Meter" value="m2" />
                    <Picker.Item label="Square DeciMeter" value="dm2" />
                    <Picker.Item label="Square MilliMeter" value="mm2" />
                    <Picker.Item label="Acre" value="acre" />
                </Picker>
            </View>
        </View>
    );
};


const LengthScreen = () => {
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();

    return (
        <View style = {styles.containerArea}> 
            <View style ={styles.containerAreaLeft}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange={() => setNum1(num1)}
                    value={num1}
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value1}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue1(itemValue)
                    
                    }
                    style ={{flex: 1}}>
                    <Picker.Item label="Kilometer Meter" value="km" />
                    <Picker.Item label="Meter" value="m" />
                    <Picker.Item label="Mile" value="mile" />
                    <Picker.Item label="Yard" value="yard" />
                    <Picker.Item label="Feet" value="ft" />
                    <Picker.Item label="Inch" value="in" />
                </Picker>
            </View>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>
                    =
                </Text>
            </View>
            <View style ={styles.containerAreaRight}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange = {() => setNum1(num2)}
                    value={num2} 
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value2}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue2(itemValue)
                    }
                    style={{flex: 1}}>
                    <Picker.Item label="Kilometer Meter" value="km" />
                    <Picker.Item label="Meter" value="m" />
                    <Picker.Item label="Mile" value="mile" />
                    <Picker.Item label="Yard" value="yard" />
                    <Picker.Item label="Feet" value="ft" />
                    <Picker.Item label="Inch" value="in" />
                </Picker>
            </View>
        </View>
    );
};




const VolumeScreen = () => {
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();

    return (
        <View style = {styles.containerArea}> 
            <View style ={styles.containerAreaLeft}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange={() => setNum1(num1)}
                    value={num1}
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value1}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue1(itemValue)
                    
                    }
                    style ={{flex: 1}}>
                    <Picker.Item label="Cubic Meter" value="m3" />
                    <Picker.Item label="Liter(Cubic dm)" value="dm3" />
                    <Picker.Item label="US Barrel" value="barrel" />
                    <Picker.Item label="US Liquid Gallon" value="gal" />
                    <Picker.Item label="US Fluid Ounce" value="fl oz" />
                    <Picker.Item label="US Pint" value="pint" />
                    <Picker.Item label="US Quart" value="quart" />
                    <Picker.Item label="US Teaspoon" value="tspn" />
                    <Picker.Item label="US Cup" value="cup" />
                </Picker>
            </View>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>
                    =
                </Text>
            </View>
            <View style ={styles.containerAreaRight}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange={() => setNum1(num1)}
                    value={num1}
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value2}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue2(itemValue)
                    }
                    style={{flex: 1}}>
                    <Picker.Item label="Cubic Meter" value="m3" />
                    <Picker.Item label="Liter(Cubic dm)" value="dm3" />
                    <Picker.Item label="US Barrel" value="barrel" />
                    <Picker.Item label="US Liquid Gallon" value="gal" />
                    <Picker.Item label="US Fluid Ounce" value="fl oz" />
                    <Picker.Item label="US Pint" value="pint" />
                    <Picker.Item label="US Quart" value="quart" />
                    <Picker.Item label="US Teaspoon" value="tspn" />
                    <Picker.Item label="US Cup" value="cup" />
                </Picker>
            </View>
        </View>
    );
};

const WeightScreen = () => {
    const [value1, setValue1] = useState();
    const [value2, setValue2] = useState();
    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();

    return (
        <View style = {styles.containerArea}> 
            <View style ={styles.containerAreaLeft}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange={() => setNum1(num1)}
                    value={num1}
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value1}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue1(itemValue)
                    
                    }
                    style ={{flex: 1}}>
                    <Picker.Item label="Kilogram" value="kg" />
                    <Picker.Item label="Gram" value="g" />
                    <Picker.Item label="Pound" value="lb" />
                    <Picker.Item label="Ounce" value="oz" />
                    <Picker.Item label="Grain" value="grain" />
                </Picker>
            </View>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>
                    =
                </Text>
            </View>
            <View style ={styles.containerAreaRight}>
                <TextInput 
                    style ={{flex: 1, backgroundColor: "#03fc77"}}
                    onValueChange = {() => setNum1(num2)}
                    value={num2} 
                    keyboardType="numeric">
                </TextInput>
                <Picker
                    selectedValue={value2}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue2(itemValue)
                    }
                    style={{flex: 1}}>
                    <Picker.Item label="Kilogram" value="kg" />
                    <Picker.Item label="Gram" value="g" />
                    <Picker.Item label="Pound" value="lb" />
                    <Picker.Item label="Ounce" value="oz" />
                    <Picker.Item label="Grain" value="grain" />
                </Picker>
            </View>
        </View>
    );
};
const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Category" component={CategoryScreen} />
                <Stack.Screen name="Area" component={AreaScreen} />
                <Stack.Screen name="Volume" component={VolumeScreen} />
                <Stack.Screen name="Length" component={LengthScreen} />
                <Stack.Screen name="Weight" component={WeightScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "40%",
        height: "40%",
    },
    containerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "grey",
    },
    containerCategory: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "grey",
    },
    rowCategory: {
        flex: 1,
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
    },
    containerArea: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "grey",
    },
    containerAreaLeft: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "blue",
    },
    containerAreaRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default App;