import React, {ReactNode} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './pages/Navigator';

const App: () => ReactNode = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
