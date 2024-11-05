import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const TodoItem = ({ todo, onDelete, onPress }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const handleDelete = () => {
    Animated.timing(translateX, {
      toValue: 500, // Slide the item to the right
      duration: 300, // Duration of the animation
      useNativeDriver: true,
    }).start(() => {
      onDelete(); // Call the delete function after the animation
    });
  };

  return (
    <Animated.View style={[styles.todoItem, { transform: [{ translateX }] }] } >
		<TouchableOpacity style={styles.itemContent} onPress={onPress}>
      <Text style={[styles.todoText, todo.completed && styles.completedText]}>
        {todo.title}
      </Text>
	  {/* <Text style={[styles.todoText, todo.completed && styles.completedText]}>
        {todo.description}
      </Text> */}
      <TouchableOpacity style={styles.checkbox} onPress={handleDelete}>
        <Text>✔️</Text>
      </TouchableOpacity>
	  </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({

	itemContent:{
		flex:1,
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems:'center'
	},
  todoItem: {
    padding: 15,
    backgroundColor: '#616569',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoItem;

