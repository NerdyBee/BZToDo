import {
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todo = ({navigation}) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('Todo').then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          setFilteredTasks(parsedTasks);
          console.log(filteredTasks);
        }
      });
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={filteredTasks}
        renderItem={({task}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{task.Title}</Text>
            <Text style={styles.detail}>{task.Desc}</Text>
          </View>
        )}
        keyExtractor={(task, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item: {
    margin: 5,
    paddingRight: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: '#000',
    fontWeight: '600',
  },
  detail: {
    fontSize: 15,
    color: '#999',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 0,
    elevation: 5,
  },
});
