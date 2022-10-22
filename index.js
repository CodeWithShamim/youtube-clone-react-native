/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import '@azure/core-asynciterator-polyfill'; 
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';

Amplify.configure({
    ...awsExports,
    Analytics: {
        disabled: true,
      },
});

AppRegistry.registerComponent(appName, () => App);
