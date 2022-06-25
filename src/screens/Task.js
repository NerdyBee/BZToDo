import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../redux/actions';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = ({navigation}) => {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTask();
    });
  }, []);

  const setTask = () => {
    storeData();
  };

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDescr(Task.Desc);
    }
  };

  const storeData = async () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: descr,
          // Done: done,
          // Color: color,
          // Image: image,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = Task;
        } else {
          newTasks = [...tasks, Task];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully.');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
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
