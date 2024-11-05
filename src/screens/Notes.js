import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Notes() {
  const navigation = useNavigation();
  const route = useRoute();
  const [note, setNote] = useState('');
  const [noteDesc, setNoteDesc] = useState('');

  const { item, onSave } = route.params || {}; 

  useEffect(() => {
    if (item) {
      setNote(item.title);
      setNoteDesc(item.description);
    }
  }, [item]); 

  const onPress = async () => {
    console.log('Attempting to save note:', note);  // Log the current note state before saving
    
    if (route.params?.onSave) {
		console.log('inside onPress of Notes')
	  console.log('check the noteDesc',noteDesc)
      await route.params.onSave(note,noteDesc);  // Ensure onSave completes before navigating back
      console.log('note transfer:', note);  // Confirm the note value
    }

    // Add a slight delay before navigating back to ensure state is fully updated
    setTimeout(() => {
      navigation.goBack();
    }, 100);  // 100ms delay
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Notes',
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: 'blue' }}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, note]);  // Include note in the dependency array to capture the latest value

  // Monitoring note state changes for debugging purposes
  useEffect(() => {
    console.log('Note updated:', note);
  }, [note]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        placeholderTextColor="#ffffff"
        multiline={true}
        textAlignVertical="top"
        value={note}
        onChangeText={(text) => {
          console.log('Text input value:', text);  // Log the value being typed
          setNote(text);
        }}
      />
	  <TextInput
        style={styles.textInputDesc}
        placeholder="Your next big idea starts here..."
        placeholderTextColor="#ffffff"
        multiline={true}
        textAlignVertical="top"
        value={noteDesc}
        onChangeText={(text) => {
            // Log the value being typed
          setNoteDesc(text);
		  console.log('Text input Desc value:', noteDesc);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  textInput: {
    backgroundColor: '#616569',
    padding: 10,
    fontSize: 35,
    shadowColor: '#000',  // Shadow for a subtle 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    color: '#ffffff',  // Darker text color for contrast
  },
  textInputDesc:{
	backgroundColor: '#616569',
	flex:1,
	fontSize: 20,
    shadowColor: '#000',  // Shadow for a subtle 3D effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    color: '#ffffff', 
  }
});
