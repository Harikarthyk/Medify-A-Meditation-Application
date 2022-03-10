/**
 * @format
 */
import codePush from "react-native-code-push";
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const MyApp = codePush(App);
AppRegistry.registerComponent(appName, () => MyApp);
