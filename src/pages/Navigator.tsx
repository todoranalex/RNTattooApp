import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../pages/LoginScreen';
import {BioScreen} from '../pages/BioScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={BioScreen} />
      <Stack.Screen name="Bio" component={BioScreen} />
    </Stack.Navigator>
  );
};
