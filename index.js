import {AppRegistry} from 'react-native';
import main, {App} from '@main/application';
import {name as appName} from './app.json';

main()
AppRegistry.registerComponent(appName, () => App);