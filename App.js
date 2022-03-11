import React, { useEffect } from 'react';
import { 
  DarkTheme,
  DefaultTheme, 
  NavigationContainer 
} from '@react-navigation/native';
import MainStackNavigation from './src/navigation';
import { 
  LogBox, 
  useColorScheme 
} from 'react-native';
import codePush from "react-native-code-push";


const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START
}

function App() {
  
  useEffect(() => {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
    });
  }, []);

  const scheme = useColorScheme();

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);

  const myDefaultTheme = {
    ...DefaultTheme, 
    colors: {
      primary: '#DE5727',
      background: '#F1F1F1',
      card: '#FFFFFF', // The background color of card-like elements, such as headers, tab bars etc.
      text: '#0A2D4D',
      border: '#D4D4D4',
      notification: '#DE5727'
    }
  }

  const myDarkTheme = {
    ...DarkTheme, 
    colors: {
      primary: '#DE5727',
      background: '#000000',
      card: '#000000', // The background color of card-like elements, such as headers, tab bars etc.
      text: '#FFFFFF',
      border: '#D4D4D4',
      notification: '#DE5727'
    }
  }
  

  return (
    <NavigationContainer 
      theme={scheme === 'dark' ? myDarkTheme : myDefaultTheme}
    >
      <MainStackNavigation />
    </NavigationContainer>
  )
}

export default  codePush(codePushOptions)(App);
