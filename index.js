/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import '@azure/core-asynciterator-polyfill'

import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import ThemeProvider from './src/store/context';

Amplify.configure({
  ...awsExports,
  Analytics: {
    disabled: true,
  },
});

const index = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default index

AppRegistry.registerComponent(appName, () => index );
