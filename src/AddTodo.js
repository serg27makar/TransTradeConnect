import React, {useState} from "react";
import {View, StyleSheet, TextInput} from "react-native";
import {Alert, Button} from "react-native";

export const AddTodo = (props) => {
    const [value, setValue] = useState("")

    const pressHandler = () => {
        if (value.trim()) {
            props.onSubmit(value)
            setValue("")
        } else {
            Alert.alert("type something text")
        }
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder={"Your text"}
                autoCorrect={false}
            />
            <Button title={"add"} onPress={pressHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        width: "70%",
        padding: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#3949ab",
        marginBottom: 10
    }
})