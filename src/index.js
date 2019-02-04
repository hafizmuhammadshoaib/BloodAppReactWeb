import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './Store/index';
import Loader from "./Component/Loader";
import Error from "./Component/Error";
import WebFont from 'webfontloader';
import "./index.css"

WebFont.load({
    google: {
        families: ['Titillium Web:300,400,700', 'sans-serif']
    }
});
ReactDOM.render(<Provider store={store} ><div style={{ height: "100vh", }} ><Loader /><Routing /><Error /></div></Provider>, document.getElementById('root'));
registerServiceWorker();
