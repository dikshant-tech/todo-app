// App.js

import React from 'react';
import TodoList from './src/screens/TodoList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notes from './src/screens/Notes';

const Stack = createNativeStackNavigator();

const App = () => {
  // return <TodoList />;
  return(
  <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="Notes" component={Notes} 
 />
      </Stack.Navigator>
    </NavigationContainer>
  )

};

export default App;
