import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('My Task');
    }, 2000);
  }, []);

  return (
    <View style={styles.body}>
      <Image style={styles.image} source={require('../../assets/todo.png')} />
      <Text style={styles.text}>Bizzy's ToDo List</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
    color: '#ffffff',
  },
});
