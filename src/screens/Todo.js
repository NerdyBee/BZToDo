import {ScrollView, StyleSheet, Text, Touchable, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Todo = ({navigation}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if (value !== null) {
        // value previously stored
        setTasks(value);
        console.log(tasks);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return (
    <View style={styles.body}>
      <ScrollView>
        {tasks?.map(([index, task]) => {
          return (
            <View style={styles.item} key={index}>
              <Text style={styles.title}>{task.Title}</Text>
              <Text style={styles.detail}>{task.Descr}</Text>
            </View>
          );
        })}
      </ScrollView>
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
