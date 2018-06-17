import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {store}from './Store/index';
ReactDOM.render(<Provider store={store} ><Routing /></Provider>, document.getElementById('root'));
registerServiceWorker();
