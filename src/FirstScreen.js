import {FlatList, StyleSheet, View} from "react-native";
import {AddTodo} from "./AddTodo";
import {Todo} from "./Todo";
import React, {useState} from "react";

export const FirstScreen = ({ navigation }) => {

    const [todos, setTodos] = useState([])

    const addTodo = (title) => {
        setTodos((prev) => [...prev,
            {
                id: Date.now().toString(),
                title
            }
        ])
        navigation.navigate('second')
    }

    const removeTodo = id => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }
    return (
        <View style={styles.content}>
            <AddTodo onSubmit={addTodo}/>
            <FlatList
                keyExtractor={item => item.id}
                data={todos}
                renderItem={({item}) => <Todo todo={item} onRemove={removeTodo}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 30,
        paddingVertical: 20,
    }
});
