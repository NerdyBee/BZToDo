import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [done, setDone] = useState(false);

  const setTask = () => {
    storeData();
  };

  const storeData = async () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var toList = {
          Id: 2,
          Title: title,
          Desc: descr,
        };
        const jsonValue = JSON.stringify(toList);
        await AsyncStorage.setItem('ToDo', jsonValue);
        alert('Data successfully saved');
        navigation.goBack();
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.input}
        onChangeText={e => setTitle(e)}
        placeholder="Title"
      />
      <TextInput
        value={descr}
        style={styles.input}
        onChangeText={e => setDescr(e)}
        placeholder="Description"
      />
      <CustomButton
        title="Submit"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={setTask}
      />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#090',
  },
});
