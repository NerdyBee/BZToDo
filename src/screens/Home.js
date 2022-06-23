import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Todo from './Todo';
import Done from './Done';

const Home = () => {
  const [toDos, setToDos] = useState({});
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'To-Do') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name === 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          activeTintColor: '#0080ff',
          inactiveTintColor: '#777777',
          labelStyle: {fontSize: 15, fontWeight: 'bold'},
        },
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="To-Do"
        component={Todo}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Done"
        component={Done}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
