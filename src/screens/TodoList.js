// src/screens/TodoList.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet,TouchableOpacity,Text } from 'react-native';
import TodoItem from '../components/TodoItem';
import { getTodos, addTodo, toggleTodo, deleteTodo,updateTodo } from '../services/realm';
import { useNavigation } from '@react-navigation/native';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosData = getTodos();
    setTodos([...todosData]);
  }, []);

  const handleAddTodo = (noteText,noteDesc) => {
	console.log('updated noteText',noteText)
	console.log('updated noteDesc',noteDesc)
    if (noteText.trim()) {
      addTodo(noteText,noteDesc);
      setTodos([...getTodos()]);
      setTitle('');
    }
  };

  const handleUpdateTodo =(item)=>{
    console.log('handleUpdateTodo',item.title)
	updateTodo(item._id,item);
	setTodos([...getTodos()]);
  }
  const navigation = useNavigation()

  const onPress = ()=>{
      
	  navigation.navigate('Notes',{
		onSave:handleAddTodo
	  })
  }

  const handleNavigation = (item)=>{
	console.log('handlenavigation')
	navigation.navigate('Notes',{item,
		onSave:handleUpdateTodo
	})
  }


  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Add new todo..."
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Todo" onPress={handleAddTodo} /> */}

      <FlatList
        data={todos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => {
              toggleTodo(item._id);
              setTodos([...getTodos()]);
            }}
            onDelete={() => {
              deleteTodo(item._id);
              setTodos([...getTodos()]);
            }}
			onPress={()=>{
				console.log('onPress')
				handleNavigation(item)
			}

			}
          />
        )}
      />
	  <TouchableOpacity style={styles.fab} onPress={onPress}>
	  <View>
      <Text>Add</Text>
	  </View>
    </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
	flex:1
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  fab:{
	backgroundColor:'#FFC000',
	padding:20,
	alignSelf:'flex-end',
	borderRadius:10
  }
});

export default TodoList;
