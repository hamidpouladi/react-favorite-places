import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store.js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@material-ui/core/styles';
import SplashScreen from './components/splashScreen';
import AppStarter from './AppStarter';
import theme from './theme';

const {store, persistor} = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <AppStarter delay={3000}>
          {isSplashScreen => (isSplashScreen ? <SplashScreen /> : <App />)}
        </AppStarter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
