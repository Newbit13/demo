import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter} from 'react-router-dom';
import {App} from './route';

let initialData = 'sss2';
try {
    initialData = document.getElementById('curcompvalue') && JSON.parse(document.getElementById('curcompvalue').value || '');
} catch (error) {
    initialData = document && document.getElementById('curcompvalue').value || '';
}

ReactDOM.hydrate(
    <BrowserRouter>
        <App initialData={initialData}/>
    </BrowserRouter>,
    document.getElementById('root')
);